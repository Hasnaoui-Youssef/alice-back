import { CategoryService } from "./category.service";
import { ProductService } from "../product/product.service";
export declare class CategoryController {
    private readonly categoryService;
    private readonly productService;
    constructor(categoryService: CategoryService, productService: ProductService);
    getOneCategory(id: string): Promise<import("mongoose").Document<unknown, {}, import("./category.schema").Category> & import("./category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getCategories(): Promise<(import("mongoose").Document<unknown, {}, import("./category.schema").Category> & import("./category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getCategoryProducts(catId: string): Promise<(import("mongoose").Document<unknown, {}, import("../product/schemas/product.schema").Product> & import("../product/schemas/product.schema").Product & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    createCategory(body: {
        name: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./category.schema").Category> & import("./category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateCategory(body: {
        name: string;
    }, oldName: string): Promise<import("mongoose").Document<unknown, {}, import("./category.schema").Category> & import("./category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteCategory(name: string): Promise<import("mongoose").Document<unknown, {}, import("./category.schema").Category> & import("./category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
