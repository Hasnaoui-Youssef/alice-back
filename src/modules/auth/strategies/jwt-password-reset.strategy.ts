import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtResetPasswordStrategy extends PassportStrategy(Strategy, "jwt-password-reset") {
  constructor(
    private readonly authService : AuthService,
  ) {
    super({
      jwtFromRequest : ExtractJwt.fromUrlQueryParameter("reset_token"),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_PASSWORD_RESET_SECRET || "default_secret",
      passReqToCallback : true,
    });
  }

  async validate(req : Request, payload: any) {
      return await this.authService.validatePasswordReset(payload.sub, req.body.newPassword);
  }
}