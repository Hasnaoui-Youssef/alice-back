"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductPolicyHandler = void 0;
const actions_enum_1 = require("../enums/actions.enum");
const product_schema_1 = require("../../modules/product/schemas/product.schema");
class CreateProductPolicyHandler {
    handle(appAbility) {
        return appAbility.can(actions_enum_1.Actions.Create, product_schema_1.Product);
    }
}
exports.CreateProductPolicyHandler = CreateProductPolicyHandler;
//# sourceMappingURL=create-product.policy.js.map