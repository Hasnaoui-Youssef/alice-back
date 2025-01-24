import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AppAbility, CaslAbilityFactory } from "src/modules/casl/casl-ability.factory/casl-ability.factory";
import { UsersService } from "src/modules/users/users.service";
import { PolicyHandler } from "../interfaces/policy-handler.interface";
import { CHECK_POLICY } from "../decorators/policy.decorator";
import { User } from "src/modules/users/user.schema";

@Injectable()
export class PoliciesGuard implements CanActivate {
    constructor(
        private reflector : Reflector,
        private caslAbilityFactory : CaslAbilityFactory,
        private userService : UsersService,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
       const policies = this.reflector.get<PolicyHandler[]>(
        CHECK_POLICY,
        context.getHandler(),
       ) || []; 
       if(policies.length === 0){
        return true;
       }
       const {user, params} = context.switchToHttp().getRequest();
       const userCheckDoc = await this.userService.findOneById(params.id);
       const userCheck = new User();
       if(userCheckDoc){
        userCheck.username = userCheckDoc.username;
       }
       const ability = this.caslAbilityFactory.createForUser(user);
       return policies.every((handler) => this.execPolicyHandler(handler, ability, userCheck));
    }

    execPolicyHandler(
        handler : PolicyHandler,
        ability : AppAbility,
        user : User,
    ){
        return handler.handle(ability, user);
    }
}