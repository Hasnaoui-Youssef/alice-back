import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtActivateAccountGuard extends AuthGuard("jwt-activate-account") {}