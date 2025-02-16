import { AppAbility } from "src/modules/casl/casl-ability.factory/casl-ability.factory";
import { PolicyHandler } from "../interfaces/policy-handler.interface";
export declare class CreateUserPolicyHandler implements PolicyHandler {
    handle(appAbility: AppAbility): boolean;
}
