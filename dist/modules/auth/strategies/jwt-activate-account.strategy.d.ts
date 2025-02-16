import { Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
declare const JwtActivateAccountStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtActivateAccountStrategy extends JwtActivateAccountStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(req: Request, payload: any): Promise<Express.User>;
}
export {};
