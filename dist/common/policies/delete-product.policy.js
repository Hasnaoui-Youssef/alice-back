"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductPolicyHandler = void 0;
const actions_enum_1 = require("../enums/actions.enum");
const product_schema_1 = require("../../modules/product/schemas/product.schema");
class DeleteProductPolicyHandler {
    handle(appAbility) {
        return appAbility.can(actions_enum_1.Actions.Delete, product_schema_1.Product);
    }
}
exports.DeleteProductPolicyHandler = DeleteProductPolicyHandler;
//# sourceMappingURL=delete-product.policy.js.map