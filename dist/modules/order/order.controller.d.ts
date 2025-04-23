import { OrderService } from './order.service';
import { Response } from 'express';
import { CreateOrderDto } from './dto/create-order.dto';
import { RequestUser } from 'src/common/types/requestUser.type';
import { ConfigService } from '@nestjs/config';
import { PaymentService } from '../payment/payment.service';
export declare class OrderController {
    private readonly orderService;
    private readonly configService;
    private readonly paymentService;
    private frontUrl;
    constructor(orderService: OrderService, configService: ConfigService, paymentService: PaymentService);
    getOrders(): Promise<import("./order.schema").Order[]>;
    getUserOrders(user: RequestUser): Promise<import("./order.schema").Order[]>;
    initPayment(response: Response, createOrderDto: CreateOrderDto, user: RequestUser): Promise<void>;
    testInitPayment(response: Response, createOrderDto: CreateOrderDto, user: RequestUser): Promise<void>;
    orderSuccess(response: Response): Promise<void>;
    paymentComplete(paymentRef: string): Promise<string>;
    orderFail(response: Response): Promise<void>;
    cancelOrder(orderId: string, user: RequestUser): Promise<import("./order.schema").Order>;
    testPaymentKey(response: Response): Promise<void>;
    getOrderById(id: string): Promise<import("./order.schema").Order>;
}
