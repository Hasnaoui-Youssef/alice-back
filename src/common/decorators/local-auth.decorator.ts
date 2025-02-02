import { applyDecorators, UseGuards } from "@nestjs/common";
import { LocalGuard } from "../guards/local-auth.guard";

export function LocalAuth(){
  return applyDecorators(UseGuards(LocalGuard));
}