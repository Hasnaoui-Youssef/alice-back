import { DynamicModule } from '@nestjs/common';
import { MailerOptions } from './interfaces/mailer-options.interface';
import { MailerAsyncOptions } from './interfaces/mailer-options-async.interface';
export declare class MailerModule {
    static forRoot(options?: MailerOptions): DynamicModule;
    static forRootAsync(options?: MailerAsyncOptions): DynamicModule;
}
