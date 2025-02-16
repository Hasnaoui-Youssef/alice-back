import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AppAbility, CaslAbilityFactory } from "src/modules/casl/casl-ability.factory/casl-ability.factory";
import { UsersService } from "src/modules/users/users.service";
import { PolicyHandler } from "../interfaces/policy-handler.interface";
import { User } from "src/modules/users/user.schema";
export declare class PoliciesGuard implements CanActivate {
    private reflector;
    private caslAbilityFactory;
    private userService;
    constructor(reflector: Reflector, caslAbilityFactory: CaslAbilityFactory, userService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    execPolicyHandler(handler: PolicyHandler, ability: AppAbility, user: User): boolean;
}
