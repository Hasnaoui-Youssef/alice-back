import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { UserRoles } from "src/common/enums/roles.enum";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
  constructor(
    private readonly configService : ConfigService,
    private readonly authSerivce : AuthService,
  ){
    super({
      clientID: configService.getOrThrow('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow('GOOGLE_CALLBACK_URL'),
      scope: ["email", "profile"],
    })
  }
  async validate(accessToken : string, refreshToken : string, profile : any, done : VerifyCallback){
    console.log({email : profile.emails[0]});
    const user = await this.authSerivce.verifyGoogleUser({
      firstName : profile.name.givenName,
      lastName : profile.name.familyName,
      email : profile.emails[0].value,
      password : ""
    })
    return user;
  }

}