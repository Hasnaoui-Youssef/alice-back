import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(
    private readonly authService : AuthService,
  ){
    super({
      usernameField: "email"
    });
  }
  
  async validate(email : string, password : string){
    try{
      if(!password){
        throw new BadRequestException("Password must not be empty");
      }
      return await this.authService.validateUser(email, password);
    }catch(error){
      console.log("Ma validiniech l user ici : ", error.message);
    }
  }

}