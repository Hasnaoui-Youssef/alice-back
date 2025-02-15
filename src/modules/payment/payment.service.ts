import { HttpService } from "@nestjs/axios";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { PAYMENT_OPTIONS } from "./constants/payment.const";
import { PaymentPayload } from "./interfaces/payment-payload.interface";
import { InitPaymentResponse } from "./interfaces/payment-init-response.interface";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { PaymentDetailsResponse } from "./interfaces/payment-details.interface";
import { PaymentOptions } from "./interfaces/payment-options.interface";

@Injectable()
export class PaymentService{
  private logger = new Logger(PaymentService.name);
  constructor(
    private readonly httpService : HttpService,
    @Inject(PAYMENT_OPTIONS) private readonly paymentOptions : PaymentOptions,
  ){}
  public async initiatePayment(payload : PaymentPayload) : Promise<{
    payUrl : string;
    paymentRef : string;
  }> {
    const { konnectUrl, ...paymentData } = {...this.paymentOptions}
    payload = {...payload, ...paymentData}
    const { data } = await firstValueFrom(this.httpService.post<InitPaymentResponse>(konnectUrl+ "init-payment", payload).pipe(
      catchError((error : AxiosError) => {
        this.logger.error(JSON.stringify(error.response.data))
        throw "unable to initialize payment"
      })
    ));
    console.log("Payment reference : ", data.paymentRef);
    console.log("Payment url : ", data.payUrl);
    return data;
  }
  public async getPaymentDetails(paymentRef : string) : Promise<PaymentDetailsResponse> {
    const { data } = await firstValueFrom(this.httpService.get<PaymentDetailsResponse>(paymentRef).pipe(
      catchError((error : AxiosError) => {
        this.logger.error(JSON.stringify(error.response.data))
        throw "failed to get payment details";
      })
    ));
    return data;
  }
}