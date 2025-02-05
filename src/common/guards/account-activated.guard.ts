import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AccountActivatedGuard implements CanActivate{
  canActivate(context: ExecutionContext): boolean {
     const request = context.switchToHttp().getRequest<Request>(); 
     const user = request.user;
     if(!user || !user.isActivated){
      return false;
     }
     return true;
  }
}