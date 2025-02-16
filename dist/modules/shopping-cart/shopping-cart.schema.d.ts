import { HydratedDocument, Types } from "mongoose";
import { CartItem } from "src/common/interfaces/cart-item.interface";
export type ShoppingCartDocument = HydratedDocument<ShoppingCart>;
export declare class ShoppingCart {
    _id: Types.ObjectId;
    clientId: Types.ObjectId;
    cartItems: CartItem[];
    totalPrice: number;
}
export declare const ShoppingCartSchema: import("mongoose").Schema<ShoppingCart, import("mongoose").Model<ShoppingCart, any, any, any, import("mongoose").Document<unknown, any, ShoppingCart> & ShoppingCart & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ShoppingCart, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ShoppingCart>> & import("mongoose").FlatRecord<ShoppingCart> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
