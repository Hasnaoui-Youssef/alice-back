import { Inject, Injectable, Logger, Optional } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { MAILER_OPTIONS, MAILER_TRANSPORT_FACTORY } from './constants/mailer.const';
import { MailerOptions } from './interfaces/mailer-options.interface';
import { MailerTransportFactory as IMailerTransportFactory } from './interfaces/mailer-transport-factory.interface';
import { MailerTransportFactory } from './mailer-transport.factory';
import * as smtpTrasnport from "nodemailer/lib/smtp-transport"
import { ISendMailOptions } from './interfaces/send-mail-options.interface';

@Injectable()
export class MailerService {
  private transporter! : Transporter;
  private transporters = new Map<string, Transporter>();
  private logger = new Logger(MailerService.name);

  constructor(
    @Inject(MAILER_OPTIONS) private readonly mailerOptions : MailerOptions,
    @Optional()
    @Inject(MAILER_TRANSPORT_FACTORY)
    private readonly transportFactory : IMailerTransportFactory,
  ){
    if(!this.transportFactory){
      this.transportFactory = new MailerTransportFactory(mailerOptions);
    }

    this.validateTransportOptions();
    
    this.setupTransporters();
  }

  private validateTransportOptions(): void{
    if(
      (!this.mailerOptions.transport ||
        Object.keys(this.mailerOptions.transport).length <= 0 &&
        !this.mailerOptions.transports
      )
    ){
      throw new Error("Make sure to provide a transport configuration object, URL or transport plugin")
    }
  }
  //TODO create verify add transporters
  private createTransporter(config : string | smtpTrasnport | smtpTrasnport.Options, name? : string) : Transporter {
    const transporter = this.transportFactory.createTransport(config);
    if(this.mailerOptions.verifyTransporter){
      this.verifyTransporter(transporter, name);
    }
    return transporter;
  }

  private verifyTransporter(transporter : Transporter, name? : string) : void {
    const transporterName = name ? `'${name}'` : "" ;
    if(!transporter.verify) return;
    Promise.resolve(transporter.verify())
      .then(() => this.logger.debug(`Transporter : ${transporterName} is ready`))
      .catch((error) => this.logger.error(`Error occurred while verifying transporter ${transporterName}: ${error.message}`))
  }

  public async verifyAllTransporters() : Promise<boolean> {
    const transporters = [...this.transporters.values(), this.transporter];
    const verifiedTransporters = await Promise.all(transporters.map(transporter => {
      if(!transporter.verify) return true;
      return Promise.resolve(transporter.verify()).then(()=> true).catch(()=>false);
    }))
    return verifiedTransporters.every(val=>val)
  }
  private setupTransporters() : void {
    if(this.mailerOptions.transports){
      Object.keys(this.mailerOptions.transports).forEach((transport) => {
        const transporter = this.createTransporter(this.mailerOptions.transports![transport], transport);
        this.transporters.set(transport, transporter);
      })

    }
    if(this.mailerOptions.transport){
      this.transporter = this.createTransporter(this.mailerOptions.transport)
    }

  }
  addTransporter(transporterName : string, config : string | smtpTrasnport | smtpTrasnport.Options) : string {
    this.transporters.set(transporterName , this.transportFactory.createTransport(config))
    return transporterName;
  }

  public async sendMail(sendMailOptions : ISendMailOptions){
    if(sendMailOptions.transporterName){
      if(this.transporters &&
        this.transporters.get(sendMailOptions.transporterName)
      ){
        return await this.transporters
          .get(sendMailOptions.transporterName)
          .sendMail(sendMailOptions);
      }else{
        throw new Error(`Initiated Transporters do not contain ${sendMailOptions.transporterName} key`);
      }
    } else {
      if(this.transporter){
        return await this.transporter.sendMail(sendMailOptions);
      }else{
        throw new Error("Transporter Object undefined")
      }
    }
  }
}
