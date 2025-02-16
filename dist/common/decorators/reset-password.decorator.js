"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPassword = ResetPassword;
const common_1 = require("@nestjs/common");
const jwt_reset_password_guard_1 = require("../guards/jwt-reset-password.guard");
function ResetPassword() {
    return (0, common_1.UseGuards)(jwt_reset_password_guard_1.JwtResetPasswordGuard);
}
//# sourceMappingURL=reset-password.decorator.js.map