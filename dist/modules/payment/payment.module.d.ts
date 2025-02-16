import { DynamicModule } from "@nestjs/common";
import { PaymentOptions } from "./interfaces/payment-options.interface";
import { PaymentAsyncOptions } from "./interfaces/payment-async-options.interface";
export declare class PaymentModule {
    static forRoot(options?: PaymentOptions): DynamicModule;
    static forRootAsync(options?: PaymentAsyncOptions): DynamicModule;
}
