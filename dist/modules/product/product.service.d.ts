import { Product } from "./schemas/product.schema";
import { Model, Types } from "mongoose";
import { ClientReview } from "./schemas/client-review.schema";
import { CreateProductDTO } from "./dto/create-product.dto";
import { UpdateProductDTO } from "./dto/update-product.dto";
import { CreateClientReviewDTO } from "./dto/create-client-review.dto";
import { UpdateClientReviewDTO } from "./dto/update-client-review.dto";
export declare class ProductService {
    private readonly productModel;
    private readonly clientReviewModel;
    constructor(productModel: Model<Product>, clientReviewModel: Model<ClientReview>);
    createProduct(createProductDTO: CreateProductDTO): Promise<import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getCategoryProducts(categoryId: string): Promise<(import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getAllProducts(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").MergeType<Product, {
        category: string;
    }>> & Omit<Product, "category"> & {
        category: string;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getActiveProducts(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").MergeType<Product, {
        category: string;
    }>> & Omit<Product, "category"> & {
        category: string;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getInactiveProducts(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").MergeType<Product, {
        category: string;
    }>> & Omit<Product, "category"> & {
        category: string;
    } & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findProductByName(name: string): Promise<import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findProductById(id: string): Promise<import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    addProductQuantity(productId: string, quantity: number): Promise<import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateProduct(productId: string, updateProductDTO: UpdateProductDTO): Promise<import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    retrieveQuantity(productId: string, quantity: number): Promise<Product>;
    deleteProduct(productId: string): Promise<import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    createClientReview(createClientReviewDTO: CreateClientReviewDTO): Promise<import("mongoose").Document<unknown, {}, ClientReview> & ClientReview & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateClientReview(crId: string, updateClientReviewDTO: UpdateClientReviewDTO): Promise<import("mongoose").Document<unknown, {}, ClientReview> & ClientReview & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteClientReview(crId: string): Promise<import("mongoose").Document<unknown, {}, ClientReview> & ClientReview & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getClientReview(crId: string): Promise<import("mongoose").Document<unknown, {}, ClientReview> & ClientReview & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getProductReviews(productId: string): Promise<(import("mongoose").Document<unknown, {}, ClientReview> & ClientReview & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    deleteProductReviews(productId: Types.ObjectId): Promise<import("mongodb").DeleteResult>;
}
