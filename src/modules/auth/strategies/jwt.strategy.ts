import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService : AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTfromCookies,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET|| "default_secret",
    });
  }

  private static extractJWTfromCookies(req : Request) : string | null {
    if(req.cookies
      && 'access_token' in req.cookies
      && req.cookies.access_token.length > 0
    ){
      return req.cookies.access_token;
    }
    return null;
  }

  async validate(payload: any) {
    return await this.authService.validateJwtUser(payload.sub)
  }
}