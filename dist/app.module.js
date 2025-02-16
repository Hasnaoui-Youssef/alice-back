"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const core_1 = require("@nestjs/core");
const auth_composite_guard_1 = require("./common/guards/auth_composite.guard");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const mongoose_1 = require("@nestjs/mongoose");
const casl_module_1 = require("./modules/casl/casl.module");
const product_module_1 = require("./modules/product/product.module");
const order_module_1 = require("./modules/order/order.module");
const roles_guard_1 = require("./common/guards/roles.guard");
const check_policy_guard_1 = require("./common/guards/check_policy.guard");
const mailer_module_1 = require("./modules/mailer/mailer.module");
const shopping_cart_module_1 = require("./modules/shopping-cart/shopping-cart.module");
const category_module_1 = require("./modules/category/category.module");
const account_activated_guard_1 = require("./common/guards/account-activated.guard");
const payment_module_1 = require("./modules/payment/payment.module");
const payment_options_interface_1 = require("./modules/payment/interfaces/payment-options.interface");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            casl_module_1.CaslModule,
            product_module_1.ProductModule,
            order_module_1.OrderModule,
            mailer_module_1.MailerModule.forRoot({
                transport: {
                    host: process.env.EMAIL_HOST,
                    port: Number(process.env.EMAIL_PORT),
                    auth: {
                        user: process.env.EMAIL_USERNAME,
                        pass: process.env.EMAIL_PASSWORD,
                    }
                }
            }),
            payment_module_1.PaymentModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    receiverWalletId: configService.get("DEV_KONNECT_WALLET_KEY"),
                    apiKey: configService.get("DEV_KONNECT_API_KEY"),
                    options: {
                        token: payment_options_interface_1.PaymentToken.TND,
                        silentWebhook: true,
                        webhook: configService.get("BACKEND_URL") + "/order/payment-complete",
                        addPaymentFeesToAmount: true,
                        successUrl: configService.get("BACKEND_URL") + "/order/order-success",
                        failUrl: configService.get("BACKEND_URL") + "/order/order-fail",
                        theme: 'dark',
                    },
                    konnectUrl: configService.get("DEV_KONNECT_URL"),
                }),
                inject: [config_1.ConfigService],
            }),
            shopping_cart_module_1.ShoppingCartModule,
            category_module_1.CategoryModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            jwt_auth_guard_1.JwtAuthGuard,
            roles_guard_1.RolesGuard,
            check_policy_guard_1.PoliciesGuard,
            account_activated_guard_1.AccountActivatedGuard,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_composite_guard_1.AuthCompositeGuard,
            }
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map