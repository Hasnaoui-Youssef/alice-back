import { ModuleMetadata, Provider, Type } from "@nestjs/common";
import { MailerOptionsFactory } from "./mailer-options-factory.interface";
import { MailerOptions } from "./mailer-options.interface";

export interface MailerAsyncOptions extends Pick<ModuleMetadata, "imports"> {
  inject? : any[];
  useClass? : Type<MailerOptionsFactory>;
  useExisting? : Type<MailerOptionsFactory>;
  useFactory? : (...args : any[]) => Promise<MailerOptions> | MailerOptions;
  extraProviders? : Provider[];
}