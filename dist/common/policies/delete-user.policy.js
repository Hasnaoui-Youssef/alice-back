"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserPolicyHandler = void 0;
const actions_enum_1 = require("../enums/actions.enum");
const user_schema_1 = require("../../modules/users/user.schema");
class DeleteUserPolicyHandler {
    handle(appAbility) {
        return appAbility.can(actions_enum_1.Actions.Delete, user_schema_1.User);
    }
}
exports.DeleteUserPolicyHandler = DeleteUserPolicyHandler;
//# sourceMappingURL=delete-user.policy.js.map