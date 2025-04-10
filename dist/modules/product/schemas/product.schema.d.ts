import { HydratedDocument, Types } from "mongoose";
export type ProductDocument = HydratedDocument<Product>;
export declare class Product {
    _id: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    description: string;
    imageUrl: string;
    category: Types.ObjectId;
    averageRating: number;
    reviewsNumber: number;
    purchasesNumber: number;
    isActive: boolean;
    proprieties?: string;
    usageAdvice?: string;
    ingredients: string[];
    storageConditions?: string;
    precautions?: string;
}
export declare const ProductSchema: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any, import("mongoose").Document<unknown, any, Product> & Product & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Product>> & import("mongoose").FlatRecord<Product> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
