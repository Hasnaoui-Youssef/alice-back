import { TransportType } from './mailer-options.interface';
import { Transporter } from 'nodemailer';
export interface MailerTransportFactory {
    createTransport(opts?: TransportType): Transporter;
}
