import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { RequestUser } from "../types/requestUser.type";

const getCurrentUserByContext = (context : ExecutionContext) : RequestUser => context.switchToHttp().getRequest<Request>().user;

export const CurrentUser = createParamDecorator(
  (_data : unknown, context : ExecutionContext) : RequestUser => getCurrentUserByContext(context)
)
