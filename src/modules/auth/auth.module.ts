import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtRefreshModule } from "./jwt-modules/jwt-refresh.module";
import { JwtAccessModule } from "./jwt-modules/jwt-access.module";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { GoogleStrategy } from "./strategies/google-oauth.strategy";
import { JwtActivateAccountModule } from "./jwt-modules/jwt-activate-account.module";
import { JwtPasswordResetModule } from "./jwt-modules/jwt-password-reset.module";
import { JwtActivateAccountStrategy } from "./strategies/jwt-activate-account.strategy";
import { JwtResetPasswordStrategy } from "./strategies/jwt-password-reset.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtAccessModule,
    JwtRefreshModule,
    JwtActivateAccountModule,
    JwtPasswordResetModule
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    GoogleStrategy,
    JwtRefreshStrategy,
    JwtActivateAccountStrategy,
    JwtResetPasswordStrategy
  ],
  controllers: [AuthController],
})
export class AuthModule {}