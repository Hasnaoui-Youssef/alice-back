import { Types } from "mongoose";
export interface CartItem {
    productId: Types.ObjectId;
    name: string;
    imageURL: string;
    price: number;
    stockQuantity: number;
    quantity: number;
}
