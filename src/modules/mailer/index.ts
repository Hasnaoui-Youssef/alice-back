export { MailerModule } from "./mailer.module";

export {
 MAILER_OPTIONS,
 MAILER_TRANSPORT_FACTORY 
} from './constants/mailer.const'

export { MailerOptions } from './interfaces/mailer-options.interface';
export { MailerOptionsFactory } from './interfaces/mailer-options-factory.interface';
export { MailerAsyncOptions } from './interfaces/mailer-options-async.interface'
export { ISendMailOptions } from './interfaces/send-mail-options.interface'
export { MailerTransportFactory } from './interfaces/mailer-transport-factory.interface'

export {MailerService} from './mailer.service'