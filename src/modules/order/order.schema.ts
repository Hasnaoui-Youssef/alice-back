import { Prop, Schema, SchemaFactory  } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { OrderStatus } from "src/common/enums/order-status.enum";
import { PaymentMethod } from "src/common/enums/payment-methods.enum";
import { CartItem } from "src/common/interfaces/cart-item.interface";
import { ShippingDetails } from "src/common/interfaces/shipping-details.interface";
import { PaymentDetailsResponse } from "../payment/interfaces/payment-details.interface";

export type OrderDocument = HydratedDocument<Order>;

@Schema({timestamps : true})
export class Order{
  @Prop({required : true, type : Types.ObjectId, ref : "User"})
  clientId : Types.ObjectId;

  @Prop({
    type : [{
      productId : {
        type : Types.ObjectId,
        ref : "Product",
        required : true,
      },
      name : { type : String, required : true, },
      imageURL : { type : String, required : true},
      price : { type : Number, required : true},
      stockQuantity : { type : Number, required : true},
      quantity : { type : Number, required : true},
    }],
    default : []
  })
  cartItems : CartItem[];

  @Prop({required : true, default : 0})
  totalPrice : number;

  @Prop({
    type : {
      address : { type : String, required : true },
      zipCode : { type : String, required : true },
      city : { type : String, required : true},
      phoneNumber : { type : String, required : true}
    },
    required : true
  })
  shippingDetails : ShippingDetails;

  @Prop({required : true, enum : Object.values(PaymentMethod), default : PaymentMethod.OnDelivery})
  paymentMethod : PaymentMethod;

  @Prop({required : true, enum : Object.values(OrderStatus), default : OrderStatus.InProcessing})
  status : OrderStatus;
  // Nzidou payment ref w payment details, ykhaliwek tejem tchouf order details hata ll client
  @Prop({required : false, unique : true})
  onlinePaymentRef? : string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);