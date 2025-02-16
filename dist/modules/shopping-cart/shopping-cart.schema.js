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
exports.ShoppingCartSchema = exports.ShoppingCart = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ShoppingCart = class ShoppingCart {
};
exports.ShoppingCart = ShoppingCart;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, auto: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ShoppingCart.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, ref: "User" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ShoppingCart.prototype, "clientId", void 0);
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
], ShoppingCart.prototype, "cartItems", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], ShoppingCart.prototype, "totalPrice", void 0);
exports.ShoppingCart = ShoppingCart = __decorate([
    (0, mongoose_1.Schema)()
], ShoppingCart);
exports.ShoppingCartSchema = mongoose_1.SchemaFactory.createForClass(ShoppingCart);
//# sourceMappingURL=shopping-cart.schema.js.map