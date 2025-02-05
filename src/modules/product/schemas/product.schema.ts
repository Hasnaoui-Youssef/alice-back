import { Prop, Schema, SchemaFactory  } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ProductDocument  = HydratedDocument<Product>

@Schema({timestamps : true})
export class Product {

  @Prop({required : true})
  name : string;

  @Prop({required : true, default : 0})
  quantity : number;

  @Prop({required : true})
  description : string;

  @Prop({required : true})
  imageUrl : string;

  @Prop({type : Types.ObjectId, requried : true})
  category : Types.ObjectId;

  @Prop({required : true, default : 0})
  averageRating : number

  @Prop({required : true, default : 0})
  reviewsNumber : number;

  @Prop({required : true, default : 0})
  purchasesNumber : number;

  @Prop({required : true, default: false})
  isActive : boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);