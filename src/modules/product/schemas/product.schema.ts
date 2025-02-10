import { Prop, Schema, SchemaFactory  } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";

export type ProductDocument  = HydratedDocument<Product>

@Schema({timestamps : true})
export class Product {

  @Prop({ type : SchemaTypes.ObjectId, auto : true})
  _id : Types.ObjectId;

  @Prop({required : true, unique : true, index : true})
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

  @Prop({required : false})
  proprieties? : string;

  @Prop({required : false})
  usageAdvice? : string;

  @Prop({type : [String], required : false})
  ingredients : string[];
  
  @Prop({required : false})
  storageConditions? : string;

  @Prop({required : false})
  precautions? : string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);