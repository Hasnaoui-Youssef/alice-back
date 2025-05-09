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
exports.OrderSchema = exports.Order = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_status_enum_1 = require("../../common/enums/order-status.enum");
const payment_methods_enum_1 = require("../../common/enums/payment-methods.enum");
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: "User" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Order.prototype, "clientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{
                productId: {
                    type: mongoose_2.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                name: { type: String, required: true, },
                imageURL: { type: String, required: true },
                price: { type: Number, required: true },
                stockQuantity: { type: Number, required: true },
                quantity: { type: Number, required: true },
            }],
        default: []
    }),
    __metadata("design:type", Array)
], Order.prototype, "cartItems", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            address: { type: String, required: true },
            zipCode: { type: String, required: true },
            city: { type: String, required: true },
            phoneNumber: { type: String, required: true }
        },
        required: true
    }),
    __metadata("design:type", Object)
], Order.prototype, "shippingDetails", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(payment_methods_enum_1.PaymentMethod), default: payment_methods_enum_1.PaymentMethod.OnDelivery }),
    __metadata("design:type", String)
], Order.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(order_status_enum_1.OrderStatus), default: order_status_enum_1.OrderStatus.InProcessing }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, unique: true }),
    __metadata("design:type", String)
], Order.prototype, "onlinePaymentRef", void 0);
exports.Order = Order = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Order);
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(Order);
//# sourceMappingURL=order.schema.js.map