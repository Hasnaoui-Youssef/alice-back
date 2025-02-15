import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { PaymentMethod } from "src/common/enums/payment-methods.enum";

export class ShippingDetailsDto {
  @IsNotEmpty()
  @IsString()
  address : string;

  @IsNotEmpty()
  @IsString()
  zipCode : string;

  @IsNotEmpty()
  @IsString()
  city : string;
}

export class CreateOrderDto {

  @IsNotEmpty()
  @Type(() => ShippingDetailsDto)
  shippingDetails : ShippingDetailsDto;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod : PaymentMethod;

}
