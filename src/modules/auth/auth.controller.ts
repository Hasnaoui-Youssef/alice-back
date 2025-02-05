import { Body, Controller, Get, Patch, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Request, Response } from 'express';
import { LocalAuth } from 'src/common/decorators/local-auth.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RequestUser } from 'src/common/types/requestUser.type';
import { JwtRefresh } from 'src/common/decorators/jwt-refresh.decorator';
import { GoogleAuth } from 'src/common/decorators/google-auth.decorator';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { ResetPassword } from 'src/common/decorators/reset-password.decorator';
import { ActivateAccount } from 'src/common/decorators/activate-account.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post("login")
  @LocalAuth()
  async login(@Body() body : { email : string, password : string }, @Res({passthrough : true}) response : Response ,@CurrentUser() user : RequestUser){
    const tokens  =  await this.authService.login(user);
    response.cookie("access_token", tokens.access_token, {
      expires : tokens.accessTokenExpiration
    });
    response.cookie("refresh_token", tokens.refresh_token, {
      expires : tokens.refreshTokenExpiration,
    });
    response.send();
  }
  @Post("sign-up")
  async signup(@Body() body : CreateUserDTO){
    await this.authService.signup(body);
    return "Check your email";
  }

  @Post("reset-password")
  async resetPassword(@Body() body : {email : string}){
    await this.authService.createPasswordRecovery(body.email);
    return "Check email for password recovery link"
  }

  @Post("refresh")
  @JwtRefresh()
  async refreshToken(
    @Res({ passthrough : true }) response : Response,
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
      response.send();
    }catch(error){
      throw new UnauthorizedException(" Failed to refresh token ")
    }
  }

  @Get("google/login")
  @GoogleAuth()
  async googleLogin(){}

  @Get("google/redirect")
  @GoogleAuth()
  async googleRedirect(
    @Res({ passthrough : true }) response : Response,
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
      response.send();
    }catch(error){
      throw new UnauthorizedException(" Failed to validate using google account")
    }
  }


  //TODO add reset password guard
  @Patch("reset-password")
  @ResetPassword()
  async changePassword(@Res() response : Response , @Body() body : {newPassword : string}, @CurrentUser() user : RequestUser){
      const tokens = await this.authService.login(user);
      response.cookie("access_token", tokens.access_token, {
        expires : tokens.accessTokenExpiration
      });
      response.cookie("refresh_token", tokens.refresh_token, {
        expires : tokens.refreshTokenExpiration,
      });
      response.send();
  }


  @Get("activate-account")
  @ActivateAccount()
  async activateAccount(@Res() response : Response , @CurrentUser() user : RequestUser){
      const tokens = await this.authService.login(user);
      response.cookie("access_token", tokens.access_token, {
        expires : tokens.accessTokenExpiration
      });
      response.cookie("refresh_token", tokens.refresh_token, {
        expires : tokens.refreshTokenExpiration,
      });
      response.send();
  }
}
