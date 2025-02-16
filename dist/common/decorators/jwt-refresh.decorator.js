"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefresh = JwtRefresh;
const common_1 = require("@nestjs/common");
const jwt_refresh_guard_1 = require("../guards/jwt-refresh.guard");
function JwtRefresh() {
    return (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard);
}
//# sourceMappingURL=jwt-refresh.decorator.js.map