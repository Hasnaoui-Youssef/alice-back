import { AppAbility } from "src/modules/casl/casl-ability.factory/casl-ability.factory";
import { PolicyHandler } from "../interfaces/policy-handler.interface";
import { Actions } from "../enums/actions.enum";
import { User } from "src/modules/users/user.schema";

export class ReadUserPolicyHandler implements PolicyHandler {
    handle(appAbility : AppAbility, user : User) : boolean {
        return appAbility.can(Actions.Read, user);
    }
}