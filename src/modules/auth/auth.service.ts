import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config';
import { timeToMilli } from 'src/common/functions/time-to-milli.function';
import { RequestUser } from 'src/common/types/requestUser.type';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { Types } from 'mongoose';
import { MailerService } from '../mailer';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UsersService,
        private readonly configService : ConfigService,
        @Inject('jwtAccessService') private readonly jwtAccessService : JwtService,
        @Inject('jwtRefreshService') private readonly jwtRefreshService : JwtService,
        @Inject('jwtPasswordResetService') private readonly jwtResetPasswordService : JwtService,
        @Inject('jwtActivateAccountService') private readonly jwtActivateAccountService : JwtService,
        private readonly mailService : MailerService
    ){}

    async login(user : RequestUser){
        const payload = {
            sub : user.userId,
            role : user.role,
        }
        const accessToken = this.jwtAccessService.sign(payload);
        const refreshToken = this.jwtRefreshService.sign(payload);
        const accessTokenExpiration = new Date( Date.now() + timeToMilli(this.configService.getOrThrow("JWT_EXPIRATION")))
        const refreshTokenExpiration = new Date( Date.now() + timeToMilli(this.configService.getOrThrow("JWT_REFRESH_EXPIRATION")))
        await this.userService.updateUser({ _id : new Types.ObjectId(user.userId)}, {$set : {jit : await bcrypt.hash(refreshToken, 10)}})
        return {
            access_token : accessToken,
            refresh_token : refreshToken,
            accessTokenExpiration,
            refreshTokenExpiration,
        }
    }
    async signup(createUserDto : CreateUserDTO ) : Promise<void> {
        const user = await this.userService.createUser(createUserDto);
        const payload = {
            sub : user._id.toString(),
            isActivated : user.isActivated,
            role : user.role
        }
        const activationToken = this.jwtActivateAccountService.sign(payload);
        const backendUrl = this.configService.getOrThrow("BACKEND_URL");
        const activationUrl = `${backendUrl}/auth/activate-account?activation_token=${activationToken}`;
        await this.mailService.sendMail({
            from : {
                address: "hello@demomailtrap.com",
                name: "Mailtrap Test",
            },
            to : [
                user.email,
            ],
            subject : "Activer votre compte site alyce",
            html : `<p> Appuyer <a href="${activationUrl}">Ici</a> pour activer votre compte. </p>`
        }).then(console.log, console.error)
    }

    async validateUser(email : string, password : string) : Promise<RequestUser>{
        try{
            const user = await this.userService.findOneByEmail(email);
            if( user && (await bcrypt.compare(password, user.password))){
                return {
                    userId : user._id.toString(),
                    isActivated : user.isActivated,
                    role : user.role
                };
            }
            throw new UnauthorizedException("Invalid credentials");
        }catch(error){
            console.log("Manejemnech n validiw l user : ", error.message)
            throw new UnauthorizedException("Invalid credentials");
        }
    }
    async validateJwtUser(id : string) : Promise<RequestUser> {
        try{
            const user = await this.userService.findOneById(id);
            return {
                userId : user._id.toString(),
                isActivated : user.isActivated,
                role : user.role
            }
        }catch(error){
            throw new UnauthorizedException("Unvalid JWT Token")
        }

    }

    async verifyUserRefreshToken(refreshToken : string, userId : string) : Promise<RequestUser>{
        try {
            const user = await this.userService.findOneById(userId);
            if(!user){
                throw new UnauthorizedException();
            }
            const authenticated = await bcrypt.compare(refreshToken, user.jit);
            if(!authenticated){
                throw new UnauthorizedException();
            }
            return {
                userId : user._id.toString(),
                isActivated : user.isActivated,
                role : user.role
            };
        }catch(error){
            throw new UnauthorizedException("Cannot verify refresh token");
        }
    }
    async verifyGoogleUser(googleUserDto : CreateUserDTO ) : Promise<RequestUser> {
        try{
            const user = await this.userService.findOneByEmail(googleUserDto.email)
            return {
                userId : user._id.toString(),
                isActivated : user.isActivated,
                role : user.role,
            };
        }catch(error){
            if(error instanceof NotFoundException){
                const newUser = await this.userService.createUser(googleUserDto);
                this.userService.updateUser({_id : newUser._id}, {isActivated : true});
                return {
                    userId : newUser._id.toString(),
                    isActivated : newUser.isActivated,
                    role : newUser.role
                }
            }
            throw new InternalServerErrorException("Cannot verify Google account");
        }
    }

    async verifyMailActivation(userId : string) : Promise<RequestUser> {
        try {
            const user = await this.userService.findOneById(userId);
            if(user.isActivated){
                throw new BadRequestException("User already Activated")
            }
            await this.userService.updateUser({_id : user._id}, {isActivated : true});
            return {
                userId : user._id.toString(),
                isActivated : user.isActivated,
                role : user.role,
            }
        }catch(error){
            let message = "Cannot activate user account";
            if(error instanceof BadRequestException){
               message = message.concat(`: User account already activated`)
            }
            throw new UnauthorizedException(message, error.message);
        }
    }
    async createPasswordRecovery(email : string) : Promise<void> {
        try{
            const user = await this.userService.findOneByEmail(email);
            const payload = {
                sub : user._id.toString(),
                isActivated : user.isActivated,
                role : user.role,
            }
            const resetToken = this.jwtResetPasswordService.sign(payload);
            const frontendUrl = this.configService.getOrThrow("BACKEND_URL");
            const recoveryUrl = `${frontendUrl}/auth/reset-password?reset_token=${resetToken}`;
            await this.mailService.sendMail({
                from : {
                    address: "hello@demomailtrap.com",
                    name: "Mailtrap Test",
                },
                to : [
                    user.email,
                ],
                subject : "Récupération du mot de passe de votre compte sur le site alyce",
                html : `<p> Appuyer <a href="${recoveryUrl}">Ici</a> pour réinitialiser votre mot de passe. </p>`
            }).then(console.log, console.error)

        }catch(error){
            throw new UnauthorizedException("Failed to generate password recovery link");
        }
    }
    async validatePasswordReset(userId : string, newPassword : string) : Promise<RequestUser> {
        try{
            const salt = await bcrypt.genSalt();
            const user = await this.userService.updateUser({_id : new Types.ObjectId(userId)}, {password : await bcrypt.hash(newPassword, salt)})
            return {
                userId : user._id.toString(),
                isActivated : user.isActivated,
                role : user.role
            }
        }catch(error){
            throw new UnauthorizedException("Failed to reset password");
        }
    }

}