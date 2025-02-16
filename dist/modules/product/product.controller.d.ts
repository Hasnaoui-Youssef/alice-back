import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(createProductDTO: CreateProductDTO): Promise<import("mongoose").Document<unknown, {}, import("./schemas/product.schema").Product> & import("./schemas/product.schema").Product & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getAllProducts(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").MergeType<import("./schemas/product.schema").Product, {
        category: string;
    }>> & Omit<import("./schemas/product.schema").Product, "category"> & {
        category: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getActiveProducts(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").MergeType<import("./schemas/product.schema").Product, {
        category: string;
    }>> & Omit<import("./schemas/product.schema").Product, "category"> & {
        category: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getInactiveProducts(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").MergeType<import("./schemas/product.schema").Product, {
        category: string;
    }>> & Omit<import("./schemas/product.schema").Product, "category"> & {
        category: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    addProductQuantity(body: {
        productId: string;
        quantity: number;
    }): Promise<import("mongoose").Document<unknown, {}, import("./schemas/product.schema").Product> & import("./schemas/product.schema").Product & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    retrieveProductQuantity(body: {
        productId: string;
        quantity: number;
    }): Promise<import("./schemas/product.schema").Product>;
    getProductReviews(productId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/client-review.schema").ClientReview> & import("./schemas/client-review.schema").ClientReview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    deleteProduct(productId: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/product.schema").Product> & import("./schemas/product.schema").Product & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getProductById(productId: string): Promise<{
        product: import("mongoose").Document<unknown, {}, import("./schemas/product.schema").Product> & import("./schemas/product.schema").Product & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        reviews: (import("mongoose").Document<unknown, {}, import("./schemas/client-review.schema").ClientReview> & import("./schemas/client-review.schema").ClientReview & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
}
