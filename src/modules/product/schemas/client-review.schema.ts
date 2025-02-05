import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({timestamps : true})
export class ClientReview{
  @Prop({type : Types.ObjectId, ref : "User", required : true})
  userId : Types.ObjectId;

  @Prop({type : Types.ObjectId, ref : "Product", required : true})
  productId : Types.ObjectId;

  @Prop({required : true})
  rating : number;

  @Prop({required : true})
  comment : string;
}

export const ClientReviewSchema = SchemaFactory.createForClass(ClientReview);