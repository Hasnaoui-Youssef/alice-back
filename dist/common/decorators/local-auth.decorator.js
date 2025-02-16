"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalAuth = LocalAuth;
const common_1 = require("@nestjs/common");
const local_auth_guard_1 = require("../guards/local-auth.guard");
function LocalAuth() {
    return (0, common_1.UseGuards)(local_auth_guard_1.LocalGuard);
}
//# sourceMappingURL=local-auth.decorator.js.map