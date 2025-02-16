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
exports.ClientReviewController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const create_client_review_dto_1 = require("./dto/create-client-review.dto");
const update_client_review_dto_1 = require("./dto/update-client-review.dto");
let ClientReviewController = class ClientReviewController {
    constructor(productService) {
        this.productService = productService;
    }
    createClientReview(user, productId, createClientReviewDTO) {
        return this.productService.createClientReview({
            ...createClientReviewDTO,
            clientId: user.userId,
            productId,
        });
    }
    deleteClientReview(id) {
        return this.productService.deleteClientReview(id);
    }
    updateClientReview(id, updateClientReviewDTO) {
        return this.productService.updateClientReview(id, updateClientReviewDTO);
    }
};
exports.ClientReviewController = ClientReviewController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)("product_id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_client_review_dto_1.CreateClientReviewDTO]),
    __metadata("design:returntype", void 0)
], ClientReviewController.prototype, "createClientReview", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientReviewController.prototype, "deleteClientReview", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_client_review_dto_1.UpdateClientReviewDTO]),
    __metadata("design:returntype", void 0)
], ClientReviewController.prototype, "updateClientReview", null);
exports.ClientReviewController = ClientReviewController = __decorate([
    (0, common_1.Controller)("client-review"),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ClientReviewController);
//# sourceMappingURL=client-review.controller.js.map