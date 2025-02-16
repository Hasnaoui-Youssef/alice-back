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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoliciesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const casl_ability_factory_1 = require("../../modules/casl/casl-ability.factory/casl-ability.factory");
const users_service_1 = require("../../modules/users/users.service");
const policy_decorator_1 = require("../decorators/policy.decorator");
const user_schema_1 = require("../../modules/users/user.schema");
let PoliciesGuard = class PoliciesGuard {
    constructor(reflector, caslAbilityFactory, userService) {
        this.reflector = reflector;
        this.caslAbilityFactory = caslAbilityFactory;
        this.userService = userService;
    }
    async canActivate(context) {
        const policies = this.reflector.get(policy_decorator_1.CHECK_POLICY, context.getHandler()) || [];
        if (policies.length === 0) {
            return true;
        }
        const { user, params } = context.switchToHttp().getRequest();
        const userCheckDoc = await this.userService.findOneById(params.id);
        const userCheck = new user_schema_1.User();
        if (userCheckDoc) {
            userCheck._id = userCheckDoc._id;
        }
        const ability = this.caslAbilityFactory.createForUser(user);
        return policies.every((handler) => this.execPolicyHandler(handler, ability, userCheck));
    }
    execPolicyHandler(handler, ability, user) {
        return handler.handle(ability, user);
    }
};
exports.PoliciesGuard = PoliciesGuard;
exports.PoliciesGuard = PoliciesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        casl_ability_factory_1.CaslAbilityFactory,
        users_service_1.UsersService])
], PoliciesGuard);
//# sourceMappingURL=check_policy.guard.js.map