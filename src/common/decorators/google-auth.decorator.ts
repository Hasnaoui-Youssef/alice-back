import { UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "../guards/google-auth.guard";

export function GoogleAuth() {
  return UseGuards(GoogleAuthGuard);
}