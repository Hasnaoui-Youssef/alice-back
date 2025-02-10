import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { OrderStatus } from "src/common/enums/order-status.enum";
import { PaymentMethod } from "src/common/enums/payment-methods.enum";

export class CreateOrderDto {

  @IsNotEmpty()
  @Type(() => ShippingDetailsDto)
  shippingDetails : ShippingDetailsDto;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod : PaymentMethod;

}

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