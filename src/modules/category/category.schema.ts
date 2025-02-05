import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>

@Schema()
export class Category{
  @Prop({required : true, unique : true, index : true })
  name : string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);