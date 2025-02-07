import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateClientReviewDTO{
  @IsNotEmpty()
  @IsNumber()
  rating : number;

  @IsNotEmpty()
  @IsString()
  comment : string;
}