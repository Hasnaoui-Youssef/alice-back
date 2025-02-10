import { DynamicModule, Global, Module } from "@nestjs/common";
import { PaymentOptions } from "./interfaces/payment-options.interface";
import { PaymentCoreModule } from "./payment-core.module";
import { PaymentAsyncOptions } from "./interfaces/payment-async-options.interface";

@Module({})
export class PaymentModule {
  public static forRoot(options? : PaymentOptions) : DynamicModule {
    return {
      module : PaymentModule,
      imports : [
        PaymentCoreModule.forRoot(options!),
      ]
    };
  }
  public static forRootAsync(options? : PaymentAsyncOptions) : DynamicModule {
    return {
      module : PaymentModule,
      imports : [
        PaymentCoreModule.forRootAsync(options!),
      ]
    };
  }
}