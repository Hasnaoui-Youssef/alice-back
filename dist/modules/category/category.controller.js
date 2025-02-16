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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const product_service_1 = require("../product/product.service");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const validation_pipe_1 = require("../../common/pipes/validation.pipe");
let CategoryController = class CategoryController {
    constructor(categoryService, productService) {
        this.categoryService = categoryService;
        this.productService = productService;
    }
    getCategories() {
        return this.categoryService.getAll();
    }
    getCategoryProducts(catId) {
        return this.productService.getCategoryProducts(catId);
    }
    createCategory(body) {
        return this.categoryService.addCategory(body.name);
    }
    updateCategory(body, oldName) {
        return this.categoryService.renameCategory(oldName, body.name);
    }
    deleteCategory(name) {
        return this.categoryService.deleteCategory(name);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)("products"),
    __param(0, (0, common_1.Query)("category_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getCategoryProducts", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Patch)(":name"),
    __param(0, (0, common_1.Body)(new validation_pipe_1.ValidationPipe())),
    __param(1, (0, common_1.Param)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)(":name"),
    __param(0, (0, common_1.Param)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "deleteCategory", null);
exports.CategoryController = CategoryController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService,
        product_service_1.ProductService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map