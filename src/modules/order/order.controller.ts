import { Body, Controller, Get, Param, Query, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { Response } from 'express';
import { CreateOrderDto } from './dto/create-order.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RequestUser } from 'src/common/types/requestUser.type';
import { ConfigService } from '@nestjs/config';
import { PaymentService } from '../payment/payment.service';

@Controller('order')
export class OrderController {
  private frontUrl : string;
  constructor(
    private readonly orderService: OrderService,
    private readonly configService : ConfigService,
    private readonly paymentService : PaymentService,
  ) {
    this.frontUrl = this.configService.get<string>("FRONTEND_SITE_URL");
  }
  @Get()
  async getOrders(){
    return this.orderService.findAll();
  }
  @Get("own")
  async getUserOrders(@CurrentUser() user : RequestUser){
    return this.orderService.findUserOrders(user.userId);
  }
  @Get("init-payment")
  async initPayment(@Res() response : Response, @Body() createOrderDto : CreateOrderDto, @CurrentUser() user : RequestUser){
    const url = await this.orderService.createOrder(createOrderDto, user.userId);
    response.status(201).redirect(url)
  }
  @Get("order-success")
  async orderSuccess(@Res() response : Response){
    response.status(301).redirect(`${this.frontUrl}/order-success`)
  }

  @Get("payment-complete")
  async paymentComplete(@Query("payment_ref") paymentRef : string){
    //await this.orderService.handlePayment(paymentRef);
    return "Payment Complete"
  }

  @Get("order-fail")
  async orderFail(@Res() response : Response){
    response.status(301).redirect(`${this.frontUrl}/order-fail`)
  }

  @Get("cancel-order")
  async cancelOrder(@Query("order-id") orderId : string, @CurrentUser() user : RequestUser){
    return await this.orderService.cancelOrder(orderId, user.userId);
  }
  @Get("test-payment")
  async testPaymentKey(@Res() response : Response){
    const payload = await this.paymentService.initiatePayment({
      amount : 250,
    })
    response.status(301).redirect(payload.payUrl);
  }
  @Get(":id")
  async getOrderById(@Param("id") id : string){
    return this.orderService.findOrderById(id);
  }
}
