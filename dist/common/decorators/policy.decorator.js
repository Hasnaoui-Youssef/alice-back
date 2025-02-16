"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckPolicy = exports.CHECK_POLICY = void 0;
const common_1 = require("@nestjs/common");
exports.CHECK_POLICY = "check_policy";
const CheckPolicy = (...handlers) => (0, common_1.SetMetadata)(exports.CHECK_POLICY, handlers);
exports.CheckPolicy = CheckPolicy;
//# sourceMappingURL=policy.decorator.js.map