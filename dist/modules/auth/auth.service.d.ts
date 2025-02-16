import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RequestUser } from 'src/common/types/requestUser.type';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { MailerService } from '../mailer';
export declare class AuthService {
    private readonly userService;
    private readonly configService;
    private readonly jwtAccessService;
    private readonly jwtRefreshService;
    private readonly jwtResetPasswordService;
    private readonly jwtActivateAccountService;
    private readonly mailService;
    constructor(userService: UsersService, configService: ConfigService, jwtAccessService: JwtService, jwtRefreshService: JwtService, jwtResetPasswordService: JwtService, jwtActivateAccountService: JwtService, mailService: MailerService);
    login(user: RequestUser): Promise<{
        access_token: string;
        refresh_token: string;
        accessTokenExpiration: Date;
        refreshTokenExpiration: Date;
    }>;
    signup(createUserDto: CreateUserDTO): Promise<void>;
    validateUser(email: string, password: string): Promise<RequestUser>;
    validateJwtUser(id: string): Promise<RequestUser>;
    verifyUserRefreshToken(refreshToken: string, userId: string): Promise<RequestUser>;
    verifyGoogleUser(googleUserDto: CreateUserDTO): Promise<RequestUser>;
    verifyMailActivation(userId: string): Promise<RequestUser>;
    createPasswordRecovery(email: string): Promise<void>;
    validatePasswordReset(userId: string, newPassword: string): Promise<RequestUser>;
}
