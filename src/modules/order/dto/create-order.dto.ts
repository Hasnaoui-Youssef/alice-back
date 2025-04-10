import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { PaymentMethod } from "src/common/enums/payment-methods.enum";

export class ShippingDetailsDto {
  @IsNotEmpty()
  @IsString()
  address : string;

  @IsNotEmpty()
  @IsNumberString()
  @IsString()
  zipCode : string;

  @IsNotEmpty()
  @IsString()
  city : string;

  @IsNotEmpty()
  @IsNumberString()
  @IsString()
  phoneNumber : string;
}

export class CreateOrderDto {

  @IsNotEmpty()
  @Type(() => ShippingDetailsDto)
  shippingDetails : ShippingDetailsDto;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod : PaymentMethod;

}
