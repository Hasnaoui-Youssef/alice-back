import { ModuleMetadata, Provider, Type } from "@nestjs/common";
import { PaymentOptionsFactory } from "./payment-options-factory";
import { PaymentOptions } from "./payment-options.interface";
export interface PaymentAsyncOptions extends Pick<ModuleMetadata, "imports"> {
    inject?: any[];
    useClass?: Type<PaymentOptionsFactory>;
    useExisting?: Type<PaymentOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<PaymentOptions> | PaymentOptions;
    extraProviders?: Provider[];
}
