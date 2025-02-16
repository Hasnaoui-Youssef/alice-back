"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductPolicyHandler = void 0;
const actions_enum_1 = require("../enums/actions.enum");
const product_schema_1 = require("../../modules/product/schemas/product.schema");
class UpdateProductPolicyHandler {
    handle(appAbility) {
        return appAbility.can(actions_enum_1.Actions.Update, product_schema_1.Product);
    }
}
exports.UpdateProductPolicyHandler = UpdateProductPolicyHandler;
//# sourceMappingURL=update-product.policy.js.map