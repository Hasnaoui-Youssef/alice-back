import { AppAbility } from "src/modules/casl/casl-ability.factory/casl-ability.factory";
import { PolicyHandler } from "../interfaces/policy-handler.interface";
import { Actions } from "../enums/actions.enum";
import { Product } from "src/modules/product/product.schema";

export class DeleteProductPolicyHandler implements PolicyHandler {
    handle(appAbility : AppAbility) : boolean {
        return appAbility.can(Actions.Delete, Product)
    }
}