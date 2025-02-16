import { AppAbility } from "src/modules/casl/casl-ability.factory/casl-ability.factory";
import { PolicyHandler } from "../interfaces/policy-handler.interface";
import { User } from "src/modules/users/user.schema";
export declare class ReadUserPolicyHandler implements PolicyHandler {
    handle(appAbility: AppAbility, user: User): boolean;
}
