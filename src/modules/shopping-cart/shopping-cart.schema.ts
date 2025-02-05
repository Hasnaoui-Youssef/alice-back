import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { CartItem } from "src/common/interfaces/cart-item.interface";

export type ShoppingCartDocument = HydratedDocument<ShoppingCart>;

@Schema()
export class ShoppingCart{
  @Prop({ type : Types.ObjectId, required : true, ref : "User"})
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
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);