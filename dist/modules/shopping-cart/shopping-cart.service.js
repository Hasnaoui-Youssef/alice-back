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
exports.ShoppingCartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const shopping_cart_schema_1 = require("./shopping-cart.schema");
const mongoose_2 = require("mongoose");
let ShoppingCartService = class ShoppingCartService {
    constructor(shoppingCartModel) {
        this.shoppingCartModel = shoppingCartModel;
    }
    async createShoppingCart(shoppingCartDTO, userId) {
        shoppingCartDTO.totalPrice = shoppingCartDTO.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        shoppingCartDTO.clientId = new mongoose_2.Types.ObjectId(userId);
        shoppingCartDTO.cartItems.forEach((item) => {
            item.productId = new mongoose_2.Types.ObjectId(item.productId);
        });
        const check = await this.shoppingCartModel.findOne({ clientId: shoppingCartDTO.clientId }).exec();
        if (check) {
            throw new common_1.ForbiddenException("User already has cart");
        }
        try {
            const shoppingCart = new this.shoppingCartModel(shoppingCartDTO);
            shoppingCart.totalPrice = shoppingCart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            return await shoppingCart.save();
        }
        catch (error) {
            throw new common_1.BadRequestException("Unable to create shopping cart ", error.message);
        }
    }
    async getAllCarts() {
        return await this.shoppingCartModel.find();
    }
    async getCartById(scId) {
        try {
            return await this.shoppingCartModel.findById(new mongoose_2.Types.ObjectId(scId));
        }
        catch (error) {
            throw new common_1.NotFoundException("Cart not found");
        }
    }
    async getUserCart(userId) {
        try {
            return await this.shoppingCartModel.findOne({ clientId: new mongoose_2.Types.ObjectId(userId) }).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException("Coulnd't find cart for user ");
        }
    }
    async addItem(userId, cartItemDto) {
        try {
            const shoppingCart = await this.shoppingCartModel.findOne({ clientId: new mongoose_2.Types.ObjectId(userId) });
            if (!shoppingCart) {
                const newShoppingCart = await this.createShoppingCart({
                    cartItems: [cartItemDto],
                }, userId);
                return newShoppingCart;
            }
            cartItemDto.productId = new mongoose_2.Types.ObjectId(cartItemDto.productId);
            const item = shoppingCart.cartItems.find((item) => item.productId === cartItemDto.productId);
            if (item) {
                item.quantity += cartItemDto.quantity;
                shoppingCart.totalPrice += item.quantity * item.price;
            }
            else {
                const cartItem = {
                    productId: new mongoose_2.Types.ObjectId(cartItemDto.productId),
                    name: cartItemDto.name,
                    imageURL: cartItemDto.imageURL,
                    price: cartItemDto.price,
                    stockQuantity: cartItemDto.stockQuantity,
                    quantity: cartItemDto.quantity,
                };
                shoppingCart.cartItems.push(cartItem);
                shoppingCart.totalPrice += cartItem.quantity * cartItem.price;
            }
            return await shoppingCart.save();
        }
        catch (error) {
            throw new common_1.BadRequestException("Unable to add item ", error.message);
        }
    }
    async deleteCartItem(userId, itemProductId) {
        try {
            const shoppingCart = await this.shoppingCartModel.findOne({ clientId: new mongoose_2.Types.ObjectId(userId) });
            shoppingCart.cartItems = shoppingCart.cartItems.filter((item) => item.productId !== new mongoose_2.Types.ObjectId(itemProductId));
            shoppingCart.totalPrice = shoppingCart.cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
            return await shoppingCart.save();
        }
        catch (error) {
            throw new common_1.BadRequestException("Unable to delete cart item ", error.message);
        }
    }
    async addProductQuantity(userId, itemProductId, quantity) {
        try {
            const shoppingCart = await this.shoppingCartModel.findOne({ clientId: new mongoose_2.Types.ObjectId(userId) });
            const item = shoppingCart.cartItems.find((item) => item.productId === new mongoose_2.Types.ObjectId(itemProductId));
            item.quantity += quantity;
            shoppingCart.totalPrice += item.price * quantity;
            return await shoppingCart.save();
        }
        catch (error) {
            throw new common_1.BadRequestException("Unable to add quantity to item ", error.message);
        }
    }
    async reduceProductQuantity(userId, itemProductId, quantity) {
        try {
            const shoppingCart = await this.shoppingCartModel.findOne({ clientId: new mongoose_2.Types.ObjectId(userId) });
            const item = shoppingCart.cartItems.find((item) => item.productId === new mongoose_2.Types.ObjectId(itemProductId));
            if (item.quantity <= quantity) {
                return await this.deleteCartItem(userId, itemProductId);
            }
            item.quantity -= quantity;
            shoppingCart.totalPrice -= item.price * quantity;
            return await shoppingCart.save();
        }
        catch (error) {
            throw new common_1.BadRequestException("Unable to add quantity to item ", error.message);
        }
    }
    async deleteShoppingCart(scId) {
        try {
            return await this.shoppingCartModel.findByIdAndDelete(new mongoose_2.Types.ObjectId(scId));
        }
        catch (error) {
            throw new common_1.BadRequestException("Unable to delete shopping cart", error.message);
        }
    }
};
exports.ShoppingCartService = ShoppingCartService;
exports.ShoppingCartService = ShoppingCartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(shopping_cart_schema_1.ShoppingCart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ShoppingCartService);
//# sourceMappingURL=shopping-cart.service.js.map