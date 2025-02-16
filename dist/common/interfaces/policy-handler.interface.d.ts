import { AppAbility } from "src/modules/casl/casl-ability.factory/casl-ability.factory";
import { User } from "src/modules/users/user.schema";
export interface PolicyHandler {
    handle(ability: AppAbility, user: User): boolean;
}
