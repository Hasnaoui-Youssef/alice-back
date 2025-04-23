import { PaymentService } from '../payment/payment.service';
import { Order } from './order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { ProductService } from '../product/product.service';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
export declare class OrderService {
    private readonly orderModel;
    private readonly paymentService;
    private readonly shoppingCartService;
    private readonly productService;
    private readonly userService;
    private readonly configService;
    private logger;
    constructor(orderModel: Model<Order>, paymentService: PaymentService, shoppingCartService: ShoppingCartService, productService: ProductService, userService: UsersService, configService: ConfigService);
    createOrder(createOrderDto: CreateOrderDto, userId: string): Promise<string>;
    testCreateOrder(createOrderDto: CreateOrderDto, userId: string): Promise<string>;
    confirmOrderOnlinePayment(paymentRef: string): Promise<Order>;
    failOrderOnlinePayment(paymentRef: string): Promise<Order>;
    cancelOrder(orderId: string, userId: string): Promise<Order>;
    handlePayment(paymentRef: string): Promise<void>;
    findOrderById(orderId: string): Promise<Order>;
    findUserOrders(userId: string): Promise<Order[]>;
    findAll(): Promise<Order[]>;
}
