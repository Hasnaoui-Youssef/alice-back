import { PaymentMethod } from "src/common/enums/payment-methods.enum";
export declare class ShippingDetailsDto {
    address: string;
    zipCode: string;
    city: string;
}
export declare class CreateOrderDto {
    shippingDetails: ShippingDetailsDto;
    paymentMethod: PaymentMethod;
}
