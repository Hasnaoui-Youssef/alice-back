import { ConfigService } from "@nestjs/config";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "../auth.service";
declare const GoogleStrategy_base: new (...args: [options: import("passport-google-oauth20").StrategyOptionsWithRequest] | [options: import("passport-google-oauth20").StrategyOptions] | [options: import("passport-google-oauth20").StrategyOptions] | [options: import("passport-google-oauth20").StrategyOptionsWithRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly configService;
    private readonly authSerivce;
    constructor(configService: ConfigService, authSerivce: AuthService);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<Express.User>;
}
export {};
