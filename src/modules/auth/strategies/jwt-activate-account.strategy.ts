import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtActivateAccountStrategy extends PassportStrategy(Strategy, "jwt-activate-account") {
  constructor(
    private readonly authService : AuthService,
  ) {
    super({
      jwtFromRequest : ExtractJwt.fromUrlQueryParameter("activation_token"),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACTIVATE_ACCOUNT_SECRET || "default_secret",
      passReqToCallback : true,
    });
  }

  async validate(req : Request, payload: any) {
    return await this.authService.verifyMailActivation(payload.sub);
  }
}