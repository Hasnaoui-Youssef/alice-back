import { IsArray, IsBooleanString, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidationOptions } from "class-validator";
import { Types } from "mongoose";

export class CreateProductDTO{
  @IsString()
  @IsNotEmpty()
  name : string;

  @IsNumber()
  @IsNotEmpty()
  price : number;

  @IsNumber()
  @IsNotEmpty()
  quantity : number;

  @IsString()
  @IsNotEmpty()
  description : string;
  
  @IsString()
  @IsNotEmpty()
  imageUrl : string;

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  category : string | Types.ObjectId;

  @IsOptional()
  @IsBooleanString()
  isActive? : boolean;

  @IsOptional()
  @IsString()
  proprieties? : string;

  @IsOptional()
  @IsString()
  usageAdvice? : string;

  @IsOptional()
  @IsString({each : true})
  @IsArray()
  ingredients? : string[];

  @IsOptional()
  @IsString()
  storageConditions? : string;

  @IsOptional()
  @IsString()
  precautions? : string;
}