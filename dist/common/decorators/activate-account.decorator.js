"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivateAccount = ActivateAccount;
const common_1 = require("@nestjs/common");
const jwt_activate_account_guard_1 = require("../guards/jwt-activate-account.guard");
function ActivateAccount() {
    return (0, common_1.UseGuards)(jwt_activate_account_guard_1.JwtActivateAccountGuard);
}
//# sourceMappingURL=activate-account.decorator.js.map