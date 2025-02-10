import { Controller, Get, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { PaymentService } from '../payment/payment.service';
import { Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly paymentSerice: PaymentService,
  ) {}
  @Get("init-payment")
  async initPayment(@Res() response : Response){
    const url = await this.paymentSerice.initiatePayment({
      amount : 1000,
    });
    response.status(201).redirect(url)
  }
  @Get("payment-success")
  gotPayment(){
    return "Khalasna eee"
  }
}
