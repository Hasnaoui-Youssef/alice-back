import { UseGuards } from "@nestjs/common";
import { JwtActivateAccountGuard } from "../guards/jwt-activate-account.guard";

export function ActivateAccount() {
  return UseGuards(JwtActivateAccountGuard)
}