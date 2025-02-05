import { AppAbility } from "src/modules/casl/casl-ability.factory/casl-ability.factory";
import { PolicyHandler } from "../interfaces/policy-handler.interface";
import { Actions } from "../enums/actions.enum";
import { Product } from "src/modules/product/schemas/product.schema";

export class UpdateProductPolicyHandler implements PolicyHandler {
    handle(appAbility : AppAbility) : boolean {
        return appAbility.can(Actions.Update, Product)
    }
}