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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("../payment/payment.service");
const mongoose_1 = require("@nestjs/mongoose");
const order_schema_1 = require("./order.schema");
const mongoose_2 = require("mongoose");
const shopping_cart_service_1 = require("../shopping-cart/shopping-cart.service");
const payment_methods_enum_1 = require("../../common/enums/payment-methods.enum");
const product_service_1 = require("../product/product.service");
const users_service_1 = require("../users/users.service");
const mailer_1 = require("../mailer");
const config_1 = require("@nestjs/config");
const order_status_enum_1 = require("../../common/enums/order-status.enum");
let OrderService = class OrderService {
    constructor(orderModel, paymentService, shoppingCartService, productService, userService, mailerService, configService) {
        this.orderModel = orderModel;
        this.paymentService = paymentService;
        this.shoppingCartService = shoppingCartService;
        this.productService = productService;
        this.userService = userService;
        this.mailerService = mailerService;
        this.configService = configService;
    }
    async createOrder(createOrderDto, userId) {
        let processedProducts;
        try {
            const user = await this.userService.findOneById(userId);
            const shoppingCart = await this.shoppingCartService.getUserCart(userId);
            const order = new this.orderModel({
                ...createOrderDto,
                ...shoppingCart
            });
            const productLock = await Promise.allSettled(order.cartItems.map(async (item) => {
                const product = await this.productService.retrieveQuantity(item.productId.toString(), item.quantity);
                return {
                    product,
                    usedQuantity: item.quantity
                };
            }));
            processedProducts = productLock
                .filter((productSettled) => productSettled.status === "fulfilled")
                .map((r) => {
                return {
                    id: r.value.product._id.toString(),
                    name: r.value.product.name,
                    usedQuantity: r.value.usedQuantity
                };
            });
            if (productLock.some(result => result.status === "rejected")) {
                throw new Error("Unable to process all products, Rollback successful");
            }
            if (order.paymentMethod === payment_methods_enum_1.PaymentMethod.Online) {
                const payResponse = await this.paymentService.initiatePayment({
                    amount: order.totalPrice * 1000,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    orderId: order._id.toString(),
                    description: `Achat des produits : ${processedProducts.map((product) => product.name).join("-")}`
                });
                order.onlinePaymentRef = payResponse.paymentRef;
                await this.shoppingCartService.deleteShoppingCart(shoppingCart._id.toString());
                return payResponse.payUrl;
            }
            order.status = order_status_enum_1.OrderStatus.InProcessing;
            await order.save();
            await this.shoppingCartService.deleteShoppingCart(shoppingCart._id.toString());
            return this.configService.getOrThrow("FRONTEND_SITE_URL");
        }
        catch (error) {
            await Promise.all(processedProducts.map((product) => {
                this.productService.addProductQuantity(product.id, product.usedQuantity);
            }));
            return this.configService.get("FRONTEND_SITE_URL") + "/failed-order";
        }
    }
    async confirmOrderOnlinePayment(paymentRef) {
        try {
            const order = await this.orderModel.findOne({ onlinePaymentRef: paymentRef }).exec();
            order.status = order_status_enum_1.OrderStatus.InProcessing;
            return await order.save();
        }
        catch (error) {
            throw new common_1.NotFoundException("Order not found");
        }
    }
    async failOrderOnlinePayment(paymentRef) {
        try {
            const order = await this.orderModel.findOne({ onlinePaymentRef: paymentRef }).exec();
            order.status = order_status_enum_1.OrderStatus.Failed;
            await Promise.all(order.cartItems.map(async (item) => {
                return await this.productService.addProductQuantity(item.productId.toString(), item.quantity);
            }));
            await order.deleteOne();
            return order;
        }
        catch (error) {
            throw new common_1.NotFoundException("Order not found");
        }
    }
    async cancelOrder(orderId, userId) {
        try {
            const order = await this.orderModel.findById(new mongoose_2.Types.ObjectId(orderId)).exec();
            if (order.clientId.toString() !== userId) {
                throw new common_1.UnauthorizedException("User Id doesn't match order's owner");
            }
            if (order.paymentMethod === payment_methods_enum_1.PaymentMethod.Online) {
                throw new common_1.ForbiddenException("Cannot cancel orders that are paid online");
            }
            order.status = order_status_enum_1.OrderStatus.Failed;
            await Promise.all(order.cartItems.map(async (item) => {
                return await this.productService.addProductQuantity(item.productId.toString(), item.quantity);
            }));
            await order.deleteOne();
            return order;
        }
        catch (error) {
            throw error;
        }
    }
    async handlePayment(paymentRef) {
        const paymentDetails = await this.paymentService.getPaymentDetails(paymentRef);
        if (paymentDetails.payment.status === "pending") {
            return;
        }
        else if (paymentDetails.payment.status === "completed") {
            await this.confirmOrderOnlinePayment(paymentRef);
        }
        else {
            await this.failOrderOnlinePayment(paymentRef);
        }
    }
    async findOrderById(orderId) {
        try {
            return await this.orderModel.findById(new mongoose_2.Types.ObjectId(orderId));
        }
        catch (error) {
            throw new common_1.NotFoundException("Unable to find order");
        }
    }
    async findUserOrders(userId) {
        return await this.orderModel.find({ clientId: new mongoose_2.Types.ObjectId(userId) }).exec();
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        payment_service_1.PaymentService,
        shopping_cart_service_1.ShoppingCartService,
        product_service_1.ProductService,
        users_service_1.UsersService,
        mailer_1.MailerService,
        config_1.ConfigService])
], OrderService);
//# sourceMappingURL=order.service.js.map