"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadUserPolicyHandler = void 0;
const actions_enum_1 = require("../enums/actions.enum");
class ReadUserPolicyHandler {
    handle(appAbility, user) {
        return appAbility.can(actions_enum_1.Actions.Read, user);
    }
}
exports.ReadUserPolicyHandler = ReadUserPolicyHandler;
//# sourceMappingURL=read-user.policy.js.map