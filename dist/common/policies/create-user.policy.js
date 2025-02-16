"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserPolicyHandler = void 0;
const actions_enum_1 = require("../enums/actions.enum");
const user_schema_1 = require("../../modules/users/user.schema");
class CreateUserPolicyHandler {
    handle(appAbility) {
        return appAbility.can(actions_enum_1.Actions.Create, user_schema_1.User);
    }
}
exports.CreateUserPolicyHandler = CreateUserPolicyHandler;
//# sourceMappingURL=create-user.policy.js.map