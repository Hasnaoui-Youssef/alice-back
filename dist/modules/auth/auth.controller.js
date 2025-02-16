"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const local_auth_decorator_1 = require("../../common/decorators/local-auth.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const jwt_refresh_decorator_1 = require("../../common/decorators/jwt-refresh.decorator");
const google_auth_decorator_1 = require("../../common/decorators/google-auth.decorator");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const reset_password_decorator_1 = require("../../common/decorators/reset-password.decorator");
const activate_account_decorator_1 = require("../../common/decorators/activate-account.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(body, response, user) {
        const tokens = await this.authService.login(user);
        response.cookie("access_token", tokens.access_token, {
            expires: tokens.accessTokenExpiration
        });
        response.cookie("refresh_token", tokens.refresh_token, {
            expires: tokens.refreshTokenExpiration,
        });
        response.send();
    }
    async signup(body) {
        await this.authService.signup(body);
        return "Check your email";
    }
    async resetPassword(body) {
        await this.authService.createPasswordRecovery(body.email);
        return "Check email for password recovery link";
    }
    async refreshToken(response, user) {
        try {
            const tokens = await this.authService.login(user);
            response.cookie("access_token", tokens.access_token, {
                expires: tokens.accessTokenExpiration
            });
            response.cookie("refresh_token", tokens.refresh_token, {
                expires: tokens.refreshTokenExpiration,
            });
            response.send();
        }
        catch (error) {
            throw new common_1.UnauthorizedException(" Failed to refresh token ");
        }
    }
    async googleLogin() { }
    async googleRedirect(response, user) {
        try {
            const tokens = await this.authService.login(user);
            response.cookie("access_token", tokens.access_token, {
                expires: tokens.accessTokenExpiration
            });
            response.cookie("refresh_token", tokens.refresh_token, {
                expires: tokens.refreshTokenExpiration,
            });
            response.send();
        }
        catch (error) {
            throw new common_1.UnauthorizedException(" Failed to validate using google account");
        }
    }
    async changePassword(response, body, user) {
        const tokens = await this.authService.login(user);
        response.cookie("access_token", tokens.access_token, {
            expires: tokens.accessTokenExpiration
        });
        response.cookie("refresh_token", tokens.refresh_token, {
            expires: tokens.refreshTokenExpiration,
        });
        response.send();
    }
    async activateAccount(response, user) {
        const tokens = await this.authService.login(user);
        response.cookie("access_token", tokens.access_token, {
            expires: tokens.accessTokenExpiration
        });
        response.cookie("refresh_token", tokens.refresh_token, {
            expires: tokens.refreshTokenExpiration,
        });
        response.send();
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("login"),
    (0, local_auth_decorator_1.LocalAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("sign-up"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)("reset-password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)("refresh"),
    (0, jwt_refresh_decorator_1.JwtRefresh)(),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Get)("google/login"),
    (0, google_auth_decorator_1.GoogleAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.Get)("google/redirect"),
    (0, google_auth_decorator_1.GoogleAuth)(),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleRedirect", null);
__decorate([
    (0, common_1.Patch)("reset-password"),
    (0, reset_password_decorator_1.ResetPassword)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)("activate-account"),
    (0, activate_account_decorator_1.ActivateAccount)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "activateAccount", null);
exports.AuthController = AuthController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map