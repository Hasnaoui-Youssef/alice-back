"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuth = GoogleAuth;
const common_1 = require("@nestjs/common");
const google_auth_guard_1 = require("../guards/google-auth.guard");
function GoogleAuth() {
    return (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard);
}
//# sourceMappingURL=google-auth.decorator.js.map