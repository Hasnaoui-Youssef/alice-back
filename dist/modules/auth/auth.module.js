"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const users_module_1 = require("../users/users.module");
const passport_1 = require("@nestjs/passport");
const jwt_refresh_module_1 = require("./jwt-modules/jwt-refresh.module");
const jwt_access_module_1 = require("./jwt-modules/jwt-access.module");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const local_strategy_1 = require("./strategies/local.strategy");
const jwt_refresh_strategy_1 = require("./strategies/jwt-refresh.strategy");
const google_oauth_strategy_1 = require("./strategies/google-oauth.strategy");
const jwt_activate_account_module_1 = require("./jwt-modules/jwt-activate-account.module");
const jwt_password_reset_module_1 = require("./jwt-modules/jwt-password-reset.module");
const jwt_activate_account_strategy_1 = require("./strategies/jwt-activate-account.strategy");
const jwt_password_reset_strategy_1 = require("./strategies/jwt-password-reset.strategy");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule.register({ defaultStrategy: "jwt" }),
            jwt_access_module_1.JwtAccessModule,
            jwt_refresh_module_1.JwtRefreshModule,
            jwt_activate_account_module_1.JwtActivateAccountModule,
            jwt_password_reset_module_1.JwtPasswordResetModule
        ],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            local_strategy_1.LocalStrategy,
            google_oauth_strategy_1.GoogleStrategy,
            jwt_refresh_strategy_1.JwtRefreshStrategy,
            jwt_activate_account_strategy_1.JwtActivateAccountStrategy,
            jwt_password_reset_strategy_1.JwtResetPasswordStrategy
        ],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map