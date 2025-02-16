"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadProductPolicyHandler = void 0;
const actions_enum_1 = require("../enums/actions.enum");
const product_schema_1 = require("../../modules/product/schemas/product.schema");
class ReadProductPolicyHandler {
    handle(appAbility) {
        return appAbility.can(actions_enum_1.Actions.Read, product_schema_1.Product);
    }
}
exports.ReadProductPolicyHandler = ReadProductPolicyHandler;
//# sourceMappingURL=read-product.policy.js.map