"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthCompositeGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCompositeGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const public_decorator_1 = require("../decorators/public.decorator");
const roles_guard_1 = require("./roles.guard");
const check_policy_guard_1 = require("./check_policy.guard");
const account_activated_guard_1 = require("./account-activated.guard");
let AuthCompositeGuard = AuthCompositeGuard_1 = class AuthCompositeGuard {
    constructor(jwtAuthGuard, reflector, roleGuard, policyGuard, accountActivatedGuard) {
        this.jwtAuthGuard = jwtAuthGuard;
        this.reflector = reflector;
        this.roleGuard = roleGuard;
        this.policyGuard = policyGuard;
        this.accountActivatedGuard = accountActivatedGuard;
        this.logger = new common_1.Logger(AuthCompositeGuard_1.name);
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            this.logger.debug("Public route accessed.");
            return true;
        }
        const jwtValid = await this.jwtAuthGuard.canActivate(context);
        const roleValid = this.roleGuard.canActivate(context);
        const policyValid = await this.policyGuard.canActivate(context);
        const activationValid = this.accountActivatedGuard.canActivate(context);
        if (!jwtValid || !roleValid || !policyValid || !activationValid) {
            return false;
        }
        return true;
    }
};
exports.AuthCompositeGuard = AuthCompositeGuard;
exports.AuthCompositeGuard = AuthCompositeGuard = AuthCompositeGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_auth_guard_1.JwtAuthGuard,
        core_1.Reflector,
        roles_guard_1.RolesGuard,
        check_policy_guard_1.PoliciesGuard,
        account_activated_guard_1.AccountActivatedGuard])
], AuthCompositeGuard);
//# sourceMappingURL=auth_composite.guard.js.map