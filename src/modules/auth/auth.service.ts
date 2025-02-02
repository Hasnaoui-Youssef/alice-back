import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { User } from '../users/user.schema';
import { ConfigService } from '@nestjs/config';
import { timeToMilli } from 'src/common/functions/time-to-milli.function';
import { RequestUser } from 'src/common/types/requestUser.type';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UsersService,
        private readonly jwtService : JwtService,
        private readonly configService : ConfigService,
    ){}

    //TODO : add context typing
    async validateUser(username : string, password : string) : Promise<User>{
        const user = await this.userService.findOneByUserName(username);
        if( user && (await bcrypt.compare(password, user.password))){
            return user;
        }
        throw new UnauthorizedException("Invalid credentials");
    }

    async login(user : RequestUser){
        const payload = {
            username : user.username,
            sub : user.userId,
            role : user.role,
        }
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, {
            secret : this.configService.getOrThrow("JWT_REFRESH_SECRET"),
        });
        const accessTokenExpiration = new Date( Date.now() + timeToMilli(this.configService.getOrThrow("JWT_EXPIRATION")))
        const refreshTokenExpiration = new Date( Date.now() + timeToMilli(this.configService.getOrThrow("JWT_REFRESH_EXPIRATION")))
        await this.userService.updateUser({ _id : user.userId}, {$set : {jit : await bcrypt.hash(refreshToken, 10)}})
        return {
            access_token : accessToken,
            refresh_token : refreshToken,
            accessTokenExpiration,
            refreshTokenExpiration,
        }

    }
    async verifyUserRefreshToken(refreshToken : string, userId : string){
        try {
            const user = await this.userService.findOneById(userId);
            if(!user){
                throw new UnauthorizedException();
            }
            const authenticated = await bcrypt.compare(refreshToken, user.jit);
            if(!authenticated){
                throw new UnauthorizedException();
            }
            return user;
        }catch(error){
            throw new UnauthorizedException("Cannot verify refresh token");
        }
    }

}