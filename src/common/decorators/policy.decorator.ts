import { SetMetadata } from "@nestjs/common";
import { PolicyHandler } from "../interfaces/policy-handler.interface";

export const CHECK_POLICY = "check_policy";
export const CheckPolicy = (...handlers : PolicyHandler[]) => SetMetadata(CHECK_POLICY, handlers);