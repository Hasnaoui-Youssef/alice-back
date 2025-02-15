import { Global, Module, DynamicModule, ValueProvider, Provider } from "@nestjs/common";
import { PaymentOptions } from "./interfaces/payment-options.interface";
import { PAYMENT_OPTIONS } from "./constants/payment.const";
import { PaymentService } from "./payment.service";
import { PaymentAsyncOptions } from "./interfaces/payment-async-options.interface";
import { PaymentOptionsFactory } from "./interfaces/payment-options-factory";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Global()
@Module({
  imports : [HttpModule.registerAsync({
    imports : [ConfigModule],
    useFactory : async (configService : ConfigService) => ({
      headers : {
        "x-api-key" : configService.get<string>('DEV_KONNECT_API_KEY'),
      }
    }),
    inject : [ConfigService]
  })]
})
export class PaymentCoreModule {
  public static forRoot(options : PaymentOptions) : DynamicModule {
    const PaymentOptionsProvider : ValueProvider<PaymentOptions> = {
      provide : PAYMENT_OPTIONS,
      useValue : options
    };
    return {
      module : PaymentCoreModule,
      providers : [
        PaymentOptionsProvider,
        PaymentService
      ],
      exports : [ PaymentService ],
    }
  }
  public static forRootAsync(options : PaymentAsyncOptions) : DynamicModule {
    const providers : Provider[] = this.createAsyncProviders(options);
    return {
      module : PaymentCoreModule,
      providers : [
        ...providers,
        PaymentService,
      ],
      exports : [
        PaymentService
      ],
      imports : options.imports,
    };
  }
  private static createAsyncProviders(options : PaymentAsyncOptions) : Provider[] {
    const providers : Provider[] = [this.createAsyncOptionsProvider(options)];
    if(options.useClass){
      providers.push({
        provide : options.useClass,
        useClass : options.useClass
      });
    }
    return providers;
  }
  private static createAsyncOptionsProvider(options : PaymentAsyncOptions) : Provider{
    if(options.useFactory){
      return {
        name : PAYMENT_OPTIONS,
        provide : PAYMENT_OPTIONS,
        useFactory: options.useFactory,
        inject : options.inject || [],
      };
    }
    return {
      name : PAYMENT_OPTIONS,
      provide : PAYMENT_OPTIONS,
      useFactory : async (optionsFactory : PaymentOptionsFactory) => {
        return optionsFactory.createPaymentOptions();
      },
      inject : [options.useExisting! || options.useClass!],
    };
  }
}