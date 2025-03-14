"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PaymentModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const common_1 = require("@nestjs/common");
const payment_core_module_1 = require("./payment-core.module");
let PaymentModule = PaymentModule_1 = class PaymentModule {
    static forRoot(options) {
        return {
            module: PaymentModule_1,
            imports: [
                payment_core_module_1.PaymentCoreModule.forRoot(options),
            ]
        };
    }
    static forRootAsync(options) {
        return {
            module: PaymentModule_1,
            imports: [
                payment_core_module_1.PaymentCoreModule.forRootAsync(options),
            ]
        };
    }
};
exports.PaymentModule = PaymentModule;
exports.PaymentModule = PaymentModule = PaymentModule_1 = __decorate([
    (0, common_1.Module)({})
], PaymentModule);
//# sourceMappingURL=payment.module.js.map