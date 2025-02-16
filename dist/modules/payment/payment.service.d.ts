import { HttpService } from "@nestjs/axios";
import { PaymentPayload } from "./interfaces/payment-payload.interface";
import { PaymentDetailsResponse } from "./interfaces/payment-details.interface";
import { PaymentOptions } from "./interfaces/payment-options.interface";
export declare class PaymentService {
    private readonly httpService;
    private readonly paymentOptions;
    private logger;
    constructor(httpService: HttpService, paymentOptions: PaymentOptions);
    initiatePayment(payload: PaymentPayload): Promise<{
        payUrl: string;
        paymentRef: string;
    }>;
    getPaymentDetails(paymentRef: string): Promise<PaymentDetailsResponse>;
}
