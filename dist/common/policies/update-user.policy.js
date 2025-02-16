"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserPolicyHandler = void 0;
const actions_enum_1 = require("../enums/actions.enum");
class UpdateUserPolicyHandler {
    handle(appAbility, user) {
        return appAbility.can(actions_enum_1.Actions.Update, user);
    }
}
exports.UpdateUserPolicyHandler = UpdateUserPolicyHandler;
//# sourceMappingURL=update-user.policy.js.map