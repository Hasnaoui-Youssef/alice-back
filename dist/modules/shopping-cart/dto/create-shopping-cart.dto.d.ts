import { Types } from "mongoose";
export declare class CreateShoppingCartDTO {
    clientId?: Types.ObjectId;
    cartItems: CartItemDTO[];
    totalPrice?: number;
}
export declare class CartItemDTO {
    productId: string | Types.ObjectId;
    name: string;
    imageURL: string;
    price: number;
    stockQuantity: number;
    quantity: number;
}
