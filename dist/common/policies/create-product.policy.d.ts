import { AppAbility } from "src/modules/casl/casl-ability.factory/casl-ability.factory";
import { PolicyHandler } from "../interfaces/policy-handler.interface";
export declare class CreateProductPolicyHandler implements PolicyHandler {
    handle(appAbility: AppAbility): boolean;
}
