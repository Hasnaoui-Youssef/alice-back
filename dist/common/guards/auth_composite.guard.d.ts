import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { RolesGuard } from "./roles.guard";
import { PoliciesGuard } from "./check_policy.guard";
import { AccountActivatedGuard } from "./account-activated.guard";
export declare class AuthCompositeGuard implements CanActivate {
    private readonly jwtAuthGuard;
    private readonly reflector;
    private readonly roleGuard;
    private readonly policyGuard;
    private readonly accountActivatedGuard;
    private readonly logger;
    constructor(jwtAuthGuard: JwtAuthGuard, reflector: Reflector, roleGuard: RolesGuard, policyGuard: PoliciesGuard, accountActivatedGuard: AccountActivatedGuard);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
