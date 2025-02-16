import { PolicyHandler } from "../interfaces/policy-handler.interface";
export declare const CHECK_POLICY = "check_policy";
export declare const CheckPolicy: (...handlers: PolicyHandler[]) => import("@nestjs/common").CustomDecorator<string>;
