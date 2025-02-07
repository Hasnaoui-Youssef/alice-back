import { IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateClientReviewDTO {
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  clientId : string | Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  productId : string | Types.ObjectId;

  @IsNotEmpty()
  @IsNumber()
  rating : number;

  @IsNotEmpty()
  @IsString()
  comment : string;
}