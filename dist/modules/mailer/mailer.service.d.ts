import { MailerOptions } from './interfaces/mailer-options.interface';
import { MailerTransportFactory as IMailerTransportFactory } from './interfaces/mailer-transport-factory.interface';
import * as smtpTrasnport from "nodemailer/lib/smtp-transport";
import { ISendMailOptions } from './interfaces/send-mail-options.interface';
export declare class MailerService {
    private readonly mailerOptions;
    private readonly transportFactory;
    private transporter;
    private transporters;
    private logger;
    constructor(mailerOptions: MailerOptions, transportFactory: IMailerTransportFactory);
    private validateTransportOptions;
    private createTransporter;
    private verifyTransporter;
    verifyAllTransporters(): Promise<boolean>;
    private setupTransporters;
    addTransporter(transporterName: string, config: string | smtpTrasnport | smtpTrasnport.Options): string;
    sendMail(sendMailOptions: ISendMailOptions): Promise<any>;
}
