import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor(
    private readonly authService : AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtRefreshStrategy.extractJWTfromCookies,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET || "default_secret",
      passReqToCallback : true,
    });
  }

  private static extractJWTfromCookies(req : Request) : string | null {
    if(req.cookies
      && 'refresh_token' in req.cookies
      && req.cookies.refresh_token.length > 0
    ){
      return req.cookies.refresh_token;
    }
    return null;
  }

  async validate(req : Request, payload: any) {
    try {
      const user = await this.authService.verifyUserRefreshToken(req.cookies?.refresh_token, payload.sub );
      return {
        userId: user._id,
        username: user.username,
        role: user.role,
        refreshToken : user.jit,
      };
    }catch(error){
      throw new UnauthorizedException("Refresh token not valid");
    }

  }
}