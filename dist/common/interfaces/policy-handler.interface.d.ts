import { AppAbility } from "src/modules/casl/casl-ability.factory/casl-ability.factory";
import { User } from "src/modules/users/user.schema";
export interface PolicyHandler {
    handle(ability: AppAbility, user: User): boolean;
}
export interface TypedPolicyHandler<T> {
    handle(ability: AppAbility): boolean;
}
export declare class ReadPolicy<T> implements TypedPolicyHandler<T> {
    private dataObjectClass;
    constructor(dataObjectClass: {
        new (): T;
    });
    handle(appAbility: AppAbility): boolean;
}
