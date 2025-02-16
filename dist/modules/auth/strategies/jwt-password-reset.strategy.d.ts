import { Strategy } from "passport-jwt";
import { Request } from "express";
import { AuthService } from "../auth.service";
declare const JwtResetPasswordStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtResetPasswordStrategy extends JwtResetPasswordStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(req: Request, payload: any): Promise<Express.User>;
}
export {};
