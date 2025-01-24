import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { UserDocument } from '../users/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UsersService,
        private readonly jwtService : JwtService
    ){}

    //TODO : add context typing
    async validateUser(username : string, password : string) : Promise<any>{
        const user = await this.userService.findOneByUserName(username);
        if( user && (await bcrypt.compare(password, user.password))){
            const {password, ...result} = user;
            return result;
        }
        throw new UnauthorizedException("Invalid credentials");
    }
    //TODO : add typing for user object
    async login(user : any){
        console.log(user);
        const payload = {
            username : user.username,
            sub : user._id,
            role : user.role,
        }
        return {
            access_token : this.jwtService.sign(payload),
        }
    }

}