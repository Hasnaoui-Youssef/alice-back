import { Strategy } from "passport-jwt";
import { Request } from "express";
import { AuthService } from "../auth.service";
declare const JwtRefreshStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    private static extractJWTfromCookies;
    validate(req: Request, payload: any): Promise<Express.User>;
}
export {};
