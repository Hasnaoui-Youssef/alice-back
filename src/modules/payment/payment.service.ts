import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { PAYMENT_OPTIONS } from "./constants/payment.const";
import { PaymentPayload } from "./interfaces/payment-payload.interface";
import { InitPaymentResponse } from "./interfaces/payment-init-response.interface";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { PaymentDetailsResponse } from "./interfaces/payment-details.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PaymentService{

  constructor(
    private readonly httpService : HttpService,
    @Inject(PAYMENT_OPTIONS) private readonly paymentOptions : PaymentOptions,
    private readonly configService : ConfigService,
  ){}
  public async initiatePayment(payload : PaymentPayload) : Promise<string> {
    payload = {...payload, ...this.paymentOptions}
    const url = this.configService.getOrThrow<string>("KONNECT_URL");
    const { data } = await firstValueFrom(this.httpService.post<InitPaymentResponse>(url + "init-payment", payload).pipe(
      catchError((error : AxiosError) => {
        console.log(error)
        throw "unable to initialize payment"
      })
    ));
    console.log("Payment reference : ", data.paymentRef);
    console.log("Payment url : ", data.payUrl);
    return data.payUrl;
  }
  public async getPaymentDetails(paymentRef : string) : Promise<PaymentDetailsResponse> {
    const { data } = await firstValueFrom(this.httpService.get<PaymentDetailsResponse>(paymentRef).pipe(
      catchError((error : AxiosError) => {
        throw "failed to get payment details";
      })
    ));
    return data;
  }
}