import { UseGuards } from "@nestjs/common";
import { JwtResetPasswordGuard } from "../guards/jwt-reset-password.guard";

export function ResetPassword(){
  return UseGuards(JwtResetPasswordGuard);
}