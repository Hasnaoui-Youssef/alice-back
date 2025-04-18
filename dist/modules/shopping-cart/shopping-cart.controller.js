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
exports.ShoppingCartController = void 0;
const common_1 = require("@nestjs/common");
const shopping_cart_service_1 = require("./shopping-cart.service");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const create_shopping_cart_dto_1 = require("./dto/create-shopping-cart.dto");
let ShoppingCartController = class ShoppingCartController {
    constructor(shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }
    getUserShoppingCart(user) {
        return this.shoppingCartService.getUserCart(user.userId);
    }
    createShoppingCart(createShoppingCartDTO, user) {
        return this.shoppingCartService.createShoppingCart(createShoppingCartDTO, user.userId);
    }
    addItem(user, cartItemDTO) {
        return this.shoppingCartService.addItem(user.userId, cartItemDTO);
    }
    deleteItem(user, productId) {
        return this.shoppingCartService.deleteCartItem(user.userId, productId);
    }
    addQuantity(user, productId, quantity) {
        return this.shoppingCartService.addProductQuantity(user.userId, productId, Number(quantity));
    }
    reduceQuantity(user, productId, quantity) {
        return this.shoppingCartService.reduceProductQuantity(user.userId, productId, Number(quantity));
    }
    getAllCarts() {
        return this.shoppingCartService.getAllCarts();
    }
    getShoppingCart(id) {
        return this.shoppingCartService.getCartById(id);
    }
};
exports.ShoppingCartController = ShoppingCartController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ShoppingCartController.prototype, "getUserShoppingCart", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shopping_cart_dto_1.CreateShoppingCartDTO, Object]),
    __metadata("design:returntype", void 0)
], ShoppingCartController.prototype, "createShoppingCart", null);
__decorate([
    (0, common_1.Post)("item"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_shopping_cart_dto_1.CartItemDTO]),
    __metadata("design:returntype", void 0)
], ShoppingCartController.prototype, "addItem", null);
__decorate([
    (0, common_1.Delete)("item"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)("product_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ShoppingCartController.prototype, "deleteItem", null);
__decorate([
    (0, common_1.Patch)("item/add"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)("product_id")),
    __param(2, (0, common_1.Query)("quantity")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ShoppingCartController.prototype, "addQuantity", null);
__decorate([
    (0, common_1.Patch)("item/reduce"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)("product_id")),
    __param(2, (0, common_1.Query)("quantity")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ShoppingCartController.prototype, "reduceQuantity", null);
__decorate([
    (0, common_1.Get)("all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShoppingCartController.prototype, "getAllCarts", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShoppingCartController.prototype, "getShoppingCart", null);
exports.ShoppingCartController = ShoppingCartController = __decorate([
    (0, common_1.Controller)('shopping-cart'),
    __metadata("design:paramtypes", [shopping_cart_service_1.ShoppingCartService])
], ShoppingCartController);
//# sourceMappingURL=shopping-cart.controller.js.map