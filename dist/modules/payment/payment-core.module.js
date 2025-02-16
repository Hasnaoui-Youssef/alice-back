"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PaymentCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentCoreModule = void 0;
const common_1 = require("@nestjs/common");
const payment_const_1 = require("./constants/payment.const");
const payment_service_1 = require("./payment.service");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
let PaymentCoreModule = PaymentCoreModule_1 = class PaymentCoreModule {
    static forRoot(options) {
        const PaymentOptionsProvider = {
            provide: payment_const_1.PAYMENT_OPTIONS,
            useValue: options
        };
        return {
            module: PaymentCoreModule_1,
            providers: [
                PaymentOptionsProvider,
                payment_service_1.PaymentService
            ],
            exports: [payment_service_1.PaymentService],
        };
    }
    static forRootAsync(options) {
        const providers = this.createAsyncProviders(options);
        return {
            module: PaymentCoreModule_1,
            providers: [
                ...providers,
                payment_service_1.PaymentService,
            ],
            exports: [
                payment_service_1.PaymentService
            ],
            imports: options.imports,
        };
    }
    static createAsyncProviders(options) {
        const providers = [this.createAsyncOptionsProvider(options)];
        if (options.useClass) {
            providers.push({
                provide: options.useClass,
                useClass: options.useClass
            });
        }
        return providers;
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                name: payment_const_1.PAYMENT_OPTIONS,
                provide: payment_const_1.PAYMENT_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            name: payment_const_1.PAYMENT_OPTIONS,
            provide: payment_const_1.PAYMENT_OPTIONS,
            useFactory: async (optionsFactory) => {
                return optionsFactory.createPaymentOptions();
            },
            inject: [options.useExisting || options.useClass],
        };
    }
};
exports.PaymentCoreModule = PaymentCoreModule;
exports.PaymentCoreModule = PaymentCoreModule = PaymentCoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [axios_1.HttpModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    headers: {
                        "x-api-key": configService.get('DEV_KONNECT_API_KEY'),
                    }
                }),
                inject: [config_1.ConfigService]
            })]
    })
], PaymentCoreModule);
//# sourceMappingURL=payment-core.module.js.map