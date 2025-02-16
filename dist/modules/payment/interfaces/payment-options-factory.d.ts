import { PaymentOptions } from "./payment-options.interface";
export interface PaymentOptionsFactory {
    createPaymentOptions(): Promise<PaymentOptions> | PaymentOptions;
}
