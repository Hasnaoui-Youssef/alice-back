import { HydratedDocument, Types } from "mongoose";
import { OrderStatus } from "src/common/enums/order-status.enum";
import { PaymentMethod } from "src/common/enums/payment-methods.enum";
import { CartItem } from "src/common/interfaces/cart-item.interface";
import { ShippingDetails } from "src/common/interfaces/shipping-details.interface";
export type OrderDocument = HydratedDocument<Order>;
export declare class Order {
    clientId: Types.ObjectId;
    cartItems: CartItem[];
    totalPrice: number;
    shippingDetails: ShippingDetails;
    paymentMethod: PaymentMethod;
    status: OrderStatus;
    onlinePaymentRef?: string;
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, import("mongoose").Document<unknown, any, Order> & Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Order>> & import("mongoose").FlatRecord<Order> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
