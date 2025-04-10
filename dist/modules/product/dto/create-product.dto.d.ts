import { Types } from "mongoose";
export declare class CreateProductDTO {
    name: string;
    price: number;
    quantity: number;
    description: string;
    imageUrl: string;
    category: string | Types.ObjectId;
    isActive?: boolean;
    proprieties?: string;
    usageAdvice?: string;
    ingredients?: string[];
    storageConditions?: string;
    precautions?: string;
}
