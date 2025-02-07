import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEmpty, IsMongoId, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Types } from "mongoose";

export class CreateShoppingCartDTO{
  @IsMongoId()
  @IsNotEmpty()
  clientId : string | Types.ObjectId;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({each : true})
  @Type(()=> CartItemDTO)
  cartItems : CartItemDTO[];

  @IsEmpty()
  totalPrice : number = 0;
}

export class CartItemDTO {

  @IsMongoId()
  @IsNotEmpty()
  productId : string | Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  name : string;

  @IsNotEmpty()
  @IsString()
  imageURL : string;

  @IsNotEmpty()
  @IsNumber()
  price : number;

  @IsNotEmpty()
  @IsNumber()
  stockQuantity : number;

  @IsNotEmpty()
  @IsNumber()
  quantity : number;
}