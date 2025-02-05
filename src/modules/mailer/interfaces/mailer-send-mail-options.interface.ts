import { SendMailOptions } from "nodemailer";

export interface MailerSendMailOptions extends SendMailOptions {
  context? : any;
}