import { DynamicModule, Global, Module, Provider, ValueProvider } from "@nestjs/common";
import { MailerOptions } from "./interfaces/mailer-options.interface";
import { MAILER_OPTIONS } from "./constants/mailer.const";
import { MailerService } from "./mailer.service";
import { MailerAsyncOptions } from "./interfaces/mailer-options-async.interface";
import { MailerOptionsFactory } from "./interfaces/mailer-options-factory.interface";


@Global()
@Module({})
export class MailerCoreModule {
  public static forRoot(options : MailerOptions): DynamicModule{
    const MailerOptionsProvider : ValueProvider<MailerOptions> = {
      provide : MAILER_OPTIONS,
      useValue : options
    };
    return {
      module : MailerCoreModule,
      providers : [
        MailerOptionsProvider,
        MailerService,
      ],
      exports : [
        MailerService
      ],
    };
  }
  public static forRootAsync(options : MailerAsyncOptions) : DynamicModule {
    const providers : Provider[] = this.createAsyncProviders(options);
    return {
      module : MailerCoreModule,
      providers : [
        ...providers,
        MailerService,
      ],
      exports : [
        MailerService
      ],
      imports : options.imports
    }
  }

  private static createAsyncProviders(options : MailerAsyncOptions) : Provider[] {
    const providers : Provider[] = [this.createAsyncOptionsProvider(options)]
    if(options.useClass){
      providers.push({
        provide : options.useClass,
        useClass : options.useClass,
      });
    }
    return providers
  }

  private static createAsyncOptionsProvider(options : MailerAsyncOptions) : Provider {
    if(options.useFactory){
      return {
        name : MAILER_OPTIONS,
        provide : MAILER_OPTIONS,
        useFactory : options.useFactory,
        inject : options.inject || [],
      };
    }
    return {
      name : MAILER_OPTIONS,
      provide : MAILER_OPTIONS,
      useFactory : async (optionsFactory : MailerOptionsFactory) => {
        return optionsFactory.createMailerOptions();
      },
      inject : [options.useExisting! || options.useClass!],
    }
  }
}