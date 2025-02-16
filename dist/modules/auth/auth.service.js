"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const config_1 = require("@nestjs/config");
const time_to_milli_function_1 = require("../../common/functions/time-to-milli.function");
const mongoose_1 = require("mongoose");
const mailer_1 = require("../mailer");
let AuthService = class AuthService {
    constructor(userService, configService, jwtAccessService, jwtRefreshService, jwtResetPasswordService, jwtActivateAccountService, mailService) {
        this.userService = userService;
        this.configService = configService;
        this.jwtAccessService = jwtAccessService;
        this.jwtRefreshService = jwtRefreshService;
        this.jwtResetPasswordService = jwtResetPasswordService;
        this.jwtActivateAccountService = jwtActivateAccountService;
        this.mailService = mailService;
    }
    async login(user) {
        const payload = {
            sub: user.userId,
            role: user.role,
        };
        const accessToken = this.jwtAccessService.sign(payload);
        const refreshToken = this.jwtRefreshService.sign(payload);
        const accessTokenExpiration = new Date(Date.now() + (0, time_to_milli_function_1.timeToMilli)(this.configService.getOrThrow("JWT_EXPIRATION")));
        const refreshTokenExpiration = new Date(Date.now() + (0, time_to_milli_function_1.timeToMilli)(this.configService.getOrThrow("JWT_REFRESH_EXPIRATION")));
        await this.userService.updateUser({ _id: new mongoose_1.Types.ObjectId(user.userId) }, { $set: { jit: await bcrypt.hash(refreshToken, 10) } });
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            accessTokenExpiration,
            refreshTokenExpiration,
        };
    }
    async signup(createUserDto) {
        const user = await this.userService.createUser(createUserDto);
        const payload = {
            sub: user._id.toString(),
            isActivated: user.isActivated,
            role: user.role
        };
        const activationToken = this.jwtActivateAccountService.sign(payload);
        const backendUrl = this.configService.getOrThrow("BACKEND_URL");
        const activationUrl = `${backendUrl}/auth/activate-account?activation_token=${activationToken}`;
        await this.mailService.sendMail({
            from: {
                address: "hello@demomailtrap.com",
                name: "Mailtrap Test",
            },
            to: [
                user.email,
            ],
            subject: "Activer votre compte site alyce",
            html: `<p> Appuyer <a href="${activationUrl}">Ici</a> pour activer votre compte. </p>`
        }).then(console.log, console.error);
    }
    async validateUser(email, password) {
        try {
            const user = await this.userService.findOneByEmail(email);
            if (user && (await bcrypt.compare(password, user.password))) {
                return {
                    userId: user._id.toString(),
                    isActivated: user.isActivated,
                    role: user.role
                };
            }
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        catch (error) {
            console.log("Manejemnech n validiw l user : ", error.message);
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
    }
    async validateJwtUser(id) {
        try {
            const user = await this.userService.findOneById(id);
            return {
                userId: user._id.toString(),
                isActivated: user.isActivated,
                role: user.role
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Unvalid JWT Token");
        }
    }
    async verifyUserRefreshToken(refreshToken, userId) {
        try {
            const user = await this.userService.findOneById(userId);
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            const authenticated = await bcrypt.compare(refreshToken, user.jit);
            if (!authenticated) {
                throw new common_1.UnauthorizedException();
            }
            return {
                userId: user._id.toString(),
                isActivated: user.isActivated,
                role: user.role
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Cannot verify refresh token");
        }
    }
    async verifyGoogleUser(googleUserDto) {
        try {
            const user = await this.userService.findOneByEmail(googleUserDto.email);
            return {
                userId: user._id.toString(),
                isActivated: user.isActivated,
                role: user.role,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                const newUser = await this.userService.createUser(googleUserDto);
                this.userService.updateUser({ _id: newUser._id }, { isActivated: true });
                return {
                    userId: newUser._id.toString(),
                    isActivated: newUser.isActivated,
                    role: newUser.role
                };
            }
            throw new common_1.InternalServerErrorException("Cannot verify Google account");
        }
    }
    async verifyMailActivation(userId) {
        try {
            const user = await this.userService.findOneById(userId);
            if (user.isActivated) {
                throw new common_1.BadRequestException("User already Activated");
            }
            await this.userService.updateUser({ _id: user._id }, { isActivated: true });
            return {
                userId: user._id.toString(),
                isActivated: user.isActivated,
                role: user.role,
            };
        }
        catch (error) {
            let message = "Cannot activate user account";
            if (error instanceof common_1.BadRequestException) {
                message = message.concat(`: User account already activated`);
            }
            throw new common_1.UnauthorizedException(message, error.message);
        }
    }
    async createPasswordRecovery(email) {
        try {
            const user = await this.userService.findOneByEmail(email);
            const payload = {
                sub: user._id.toString(),
                isActivated: user.isActivated,
                role: user.role,
            };
            const resetToken = this.jwtResetPasswordService.sign(payload);
            const frontendUrl = this.configService.getOrThrow("BACKEND_URL");
            const recoveryUrl = `${frontendUrl}/auth/reset-password?reset_token=${resetToken}`;
            await this.mailService.sendMail({
                from: {
                    address: "hello@demomailtrap.com",
                    name: "Mailtrap Test",
                },
                to: [
                    user.email,
                ],
                subject: "Récupération du mot de passe de votre compte sur le site alyce",
                html: `<p> Appuyer <a href="${recoveryUrl}">Ici</a> pour réinitialiser votre mot de passe. </p>`
            }).then(console.log, console.error);
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Failed to generate password recovery link");
        }
    }
    async validatePasswordReset(userId, newPassword) {
        try {
            const salt = await bcrypt.genSalt();
            const user = await this.userService.updateUser({ _id: new mongoose_1.Types.ObjectId(userId) }, { password: await bcrypt.hash(newPassword, salt) });
            return {
                userId: user._id.toString(),
                isActivated: user.isActivated,
                role: user.role
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Failed to reset password");
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)('jwtAccessService')),
    __param(3, (0, common_1.Inject)('jwtRefreshService')),
    __param(4, (0, common_1.Inject)('jwtPasswordResetService')),
    __param(5, (0, common_1.Inject)('jwtActivateAccountService')),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        config_1.ConfigService,
        jwt_1.JwtService,
        jwt_1.JwtService,
        jwt_1.JwtService,
        jwt_1.JwtService,
        mailer_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map