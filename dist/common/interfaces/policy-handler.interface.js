"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadPolicy = void 0;
const actions_enum_1 = require("../enums/actions.enum");
class ReadPolicy {
    constructor(dataObjectClass) {
        this.dataObjectClass = dataObjectClass;
    }
    handle(appAbility) {
        return appAbility.can(actions_enum_1.Actions.Read, this.dataObjectClass);
    }
}
exports.ReadPolicy = ReadPolicy;
//# sourceMappingURL=policy-handler.interface.js.map