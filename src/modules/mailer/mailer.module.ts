import { DynamicModule, Module } from '@nestjs/common';
import { MailerOptions } from './interfaces/mailer-options.interface';
import { MailerCoreModule } from './mailer-core.module';
import { MailerAsyncOptions } from './interfaces/mailer-options-async.interface';

@Module({})
export class MailerModule {
  public static forRoot(options? : MailerOptions) : DynamicModule {
    return {
      module : MailerModule,
      imports : [
        MailerCoreModule.forRoot(options!),
      ]
    };
  }
  public static forRootAsync(options? : MailerAsyncOptions) : DynamicModule {
    return {
      module : MailerModule,
      imports : [
        MailerCoreModule.forRootAsync(options!),
      ]
    };
  }
}
