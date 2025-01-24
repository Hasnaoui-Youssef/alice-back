import { Prop, Schema, SchemaFactory  } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Order extends Document{
}

export const OrderSchema = SchemaFactory.createForClass(Order);