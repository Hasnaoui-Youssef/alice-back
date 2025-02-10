import { Options } from "./payment-options.interface"

export interface PaymentPayload extends Options{
  amount : number;
  description? : string;
  firstName? : string;
  lastName? : string;
  phoneNumber? : string;
  email? : string;
  orderId? : string;
}