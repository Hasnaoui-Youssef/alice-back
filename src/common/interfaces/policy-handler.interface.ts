import { AppAbility } from "src/modules/casl/casl-ability.factory/casl-ability.factory";
import { User } from "src/modules/users/user.schema";
import { Actions } from "../enums/actions.enum";

export interface PolicyHandler {
    handle(ability : AppAbility, user : User) : boolean;
}

export interface TypedPolicyHandler<T>{
    handle(ability : AppAbility) : boolean;
}

export class ReadPolicy<T> implements TypedPolicyHandler<T> {
    constructor(private dataObjectClass : { new() : T}){}
    handle(appAbility : AppAbility){
        return appAbility.can(Actions.Read, this.dataObjectClass)
    }
}
