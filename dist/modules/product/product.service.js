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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_schema_1 = require("./schemas/product.schema");
const mongoose_2 = require("mongoose");
const client_review_schema_1 = require("./schemas/client-review.schema");
let ProductService = class ProductService {
    constructor(productModel, clientReviewModel) {
        this.productModel = productModel;
        this.clientReviewModel = clientReviewModel;
    }
    async createProduct(createProductDTO) {
        try {
            if (typeof createProductDTO.category === "string") {
                createProductDTO.category = new mongoose_2.Types.ObjectId(createProductDTO.category);
            }
            const product = new this.productModel(createProductDTO);
            return await product.save();
        }
        catch (error) {
            throw new common_1.BadRequestException("Unable to create new product : ", error.message);
        }
    }
    async getCategoryProducts(categoryId) {
        return await this.productModel.find({ category: new mongoose_2.Types.ObjectId(categoryId) });
    }
    async getAllProducts() {
        return await this.productModel.find().select("name description imageUrl category price").populate("category");
    }
    async getActiveProducts() {
        return await this.productModel.find({ isActive: true }).select("name description imageUrl category price").populate("category");
    }
    async getInactiveProducts() {
        return await this.productModel.find({ isActive: false }).select("name description imageUrl category price").populate("category");
    }
    async findProductByName(name) {
        try {
            return await this.productModel.findOne({ name }).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException("Product Not found");
        }
    }
    async findProductById(id) {
        try {
            return await this.productModel.findById(new mongoose_2.Types.ObjectId(id)).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException("Product Not found");
        }
    }
    async addProductQuantity(productId, quantity) {
        try {
            if (quantity <= 0) {
                throw new Error("Quantity should be bigger than 0");
            }
            return await this.productModel.findByIdAndUpdate(new mongoose_2.Types.ObjectId(productId), { $inc: { quantity } });
        }
        catch (error) {
            throw new common_1.BadRequestException("Unable to add product quantity ", error.message);
        }
    }
    async updateProduct(productId, updateProductDTO) {
        try {
            return await this.productModel.findOneAndUpdate(new mongoose_2.Types.ObjectId(productId), updateProductDTO, { new: true, runValidators: true });
        }
        catch (error) {
            throw new common_1.BadRequestException("Unable to update product ", error.message);
        }
    }
    async retrieveQuantity(productId, quantity) {
        try {
            const product = await this.productModel.findById(new mongoose_2.Types.ObjectId(productId));
            if (product.quantity < quantity) {
                throw new Error("Insufficient stock");
            }
            product.quantity -= quantity;
            if (product.quantity === 0) {
                product.isActive = false;
            }
            return await product.save({ validateBeforeSave: true, validateModifiedOnly: true });
        }
        catch (error) {
            throw new common_1.BadRequestException("Unable to retrieve quantity ", error.message);
        }
    }
    async deleteProduct(productId) {
        try {
            const product = await this.productModel.findByIdAndDelete(new mongoose_2.Types.ObjectId(productId));
            await this.deleteProductReviews(product._id);
            return product;
        }
        catch (error) {
            throw new common_1.BadRequestException("Unable to delete product ", error.message);
        }
    }
    async createClientReview(createClientReviewDTO) {
        try {
            createClientReviewDTO.productId = new mongoose_2.Types.ObjectId(createClientReviewDTO.productId);
            createClientReviewDTO.clientId = new mongoose_2.Types.ObjectId(createClientReviewDTO.clientId);
            const product = await this.productModel.findById(createClientReviewDTO.productId);
            const totalRating = product.averageRating * product.reviewsNumber;
            const newRating = (totalRating + createClientReviewDTO.rating) / (product.reviewsNumber + 1);
            const clientReview = new this.clientReviewModel(createClientReviewDTO);
            const review = await clientReview.save();
            product.averageRating = newRating;
            product.reviewsNumber += 1;
            await product.save();
            return review;
        }
        catch (error) {
            throw new common_1.BadRequestException("Cannot Create Review ", error.message);
        }
    }
    async updateClientReview(crId, updateClientReviewDTO) {
        try {
            return await this.clientReviewModel.findByIdAndUpdate(new mongoose_2.Types.ObjectId(crId), updateClientReviewDTO);
        }
        catch (error) {
            throw new common_1.BadRequestException("Cannot update review ", error.message);
        }
    }
    async deleteClientReview(crId) {
        try {
            const clientReview = await this.clientReviewModel.findByIdAndDelete(new mongoose_2.Types.ObjectId(crId));
            const product = await this.productModel.findById(clientReview.productId);
            const totalRating = product.averageRating * product.reviewsNumber;
            const newRating = (totalRating - clientReview.rating) / (product.reviewsNumber - 1);
            product.averageRating = newRating;
            product.reviewsNumber -= 1;
            await product.save();
            return clientReview;
        }
        catch (error) {
            throw new common_1.BadRequestException("Cannot Delete review ", error.message);
        }
    }
    async getClientReview(crId) {
        try {
            return await this.clientReviewModel.findById(new mongoose_2.Types.ObjectId(crId));
        }
        catch (error) {
            throw new common_1.NotFoundException("Cannot find Review");
        }
    }
    async getProductReviews(productId) {
        try {
            return await this.clientReviewModel.find({ productId: new mongoose_2.Types.ObjectId(productId) });
        }
        catch (error) {
            throw new common_1.BadRequestException("Cannot find reviews for product ", error.message);
        }
    }
    async deleteProductReviews(productId) {
        try {
            return await this.clientReviewModel.deleteMany({ productId });
        }
        catch (error) {
            throw new common_1.BadRequestException("Cannot delete reviews for product ", error.message);
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(client_review_schema_1.ClientReview.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ProductService);
//# sourceMappingURL=product.service.js.map