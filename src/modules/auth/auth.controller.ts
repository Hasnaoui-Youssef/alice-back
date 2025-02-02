import { Body, Controller, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Request, Response } from 'express';
import { LocalAuth } from 'src/common/decorators/local-auth.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RequestUser } from 'src/common/types/requestUser.type';
import { JwtRefresh } from 'src/common/decorators/jwt-refresh.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post("login")
  @LocalAuth()
  async login(@Body() body : { username : string, password : string }, @Res({passthrough : true}) response : Response ,@CurrentUser() user : RequestUser){
    try{
      const tokens  =  await this.authService.login(user);
      response.cookie("access_token", tokens.access_token, {
        expires : tokens.accessTokenExpiration
      });
      response.cookie("refresh_token", tokens.refresh_token, {
        expires : tokens.refreshTokenExpiration,
      });
    }catch(error){
      throw new UnauthorizedException(" Failed to refresh token ")
    }
  }

  @Post("refresh")
  @JwtRefresh()
  async refreshToken(
    @Res({ passthrough : true }) response : Response,
    @Req() request : Request,
    @CurrentUser() user : RequestUser
  ){
    try{
      const tokens = await this.authService.login(user);
      response.cookie("access_token", tokens.access_token, {
        expires : tokens.accessTokenExpiration
      });
      response.cookie("refresh_token", tokens.refresh_token, {
        expires : tokens.refreshTokenExpiration,
      });
    }catch(error){
      throw new UnauthorizedException(" Failed to refresh token ")
    }
  }
}
