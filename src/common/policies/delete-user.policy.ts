import { AppAbility } from "src/modules/casl/casl-ability.factory/casl-ability.factory";
import { PolicyHandler } from "../interfaces/policy-handler.interface";
import { Actions } from "../enums/actions.enum";
import { User } from "src/modules/users/user.schema";

export class DeleteUserPolicyHandler implements PolicyHandler {
    handle(appAbility : AppAbility) : boolean {
        return appAbility.can(Actions.Delete, User)
    }
}