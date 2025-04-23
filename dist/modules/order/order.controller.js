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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const config_1 = require("@nestjs/config");
const payment_service_1 = require("../payment/payment.service");
let OrderController = class OrderController {
    constructor(orderService, configService, paymentService) {
        this.orderService = orderService;
        this.configService = configService;
        this.paymentService = paymentService;
        this.frontUrl = this.configService.get("FRONTEND_SITE_URL");
    }
    async getOrders() {
        return this.orderService.findAll();
    }
    async getUserOrders(user) {
        return this.orderService.findUserOrders(user.userId);
    }
    async initPayment(response, createOrderDto, user) {
        const url = await this.orderService.createOrder(createOrderDto, user.userId);
        response.status(201).redirect(url);
    }
    async testInitPayment(response, createOrderDto, user) {
        const url = await this.orderService.testCreateOrder(createOrderDto, user.userId);
        response.status(201).redirect(url);
    }
    async orderSuccess(response) {
        response.status(301).redirect(`${this.frontUrl}/order-success`);
    }
    async paymentComplete(paymentRef) {
        return "Payment Complete";
    }
    async orderFail(response) {
        response.status(301).redirect(`${this.frontUrl}/order-fail`);
    }
    async cancelOrder(orderId, user) {
        return await this.orderService.cancelOrder(orderId, user.userId);
    }
    async testPaymentKey(response) {
        const payload = await this.paymentService.initiatePayment({
            amount: 250,
        });
        response.status(301).redirect(payload.payUrl);
    }
    async getOrderById(id) {
        return this.orderService.findOrderById(id);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Get)("own"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getUserOrders", null);
__decorate([
    (0, common_1.Get)("init-payment"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_order_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "initPayment", null);
__decorate([
    (0, common_1.Get)("test-init-payment"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_order_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "testInitPayment", null);
__decorate([
    (0, common_1.Get)("order-success"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "orderSuccess", null);
__decorate([
    (0, common_1.Get)("payment-complete"),
    __param(0, (0, common_1.Query)("payment_ref")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "paymentComplete", null);
__decorate([
    (0, common_1.Get)("order-fail"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "orderFail", null);
__decorate([
    (0, common_1.Get)("cancel-order"),
    __param(0, (0, common_1.Query)("order-id")),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "cancelOrder", null);
__decorate([
    (0, common_1.Get)("test-payment"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "testPaymentKey", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderById", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        config_1.ConfigService,
        payment_service_1.PaymentService])
], OrderController);
//# sourceMappingURL=order.controller.js.map