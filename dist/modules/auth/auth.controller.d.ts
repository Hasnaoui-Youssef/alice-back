import { AuthService } from './auth.service';
import { Response } from 'express';
import { RequestUser } from 'src/common/types/requestUser.type';
import { CreateUserDTO } from '../users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        password: string;
    }, response: Response, user: RequestUser): Promise<void>;
    signup(body: CreateUserDTO): Promise<string>;
    resetPassword(body: {
        email: string;
    }): Promise<string>;
    refreshToken(response: Response, user: RequestUser): Promise<void>;
    googleLogin(): Promise<void>;
    googleRedirect(response: Response, user: RequestUser): Promise<void>;
    changePassword(response: Response, body: {
        newPassword: string;
    }, user: RequestUser): Promise<void>;
    activateAccount(response: Response, user: RequestUser): Promise<void>;
}
