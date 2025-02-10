import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PaymentService } from '../payment/payment.service';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.schema';
import { Model, Types } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { PaymentMethod } from 'src/common/enums/payment-methods.enum';
import { ProductService } from '../product/product.service';
import { UsersService } from '../users/users.service';
import { MailerService } from '../mailer';
import { ConfigService } from '@nestjs/config';
import { OrderStatus } from 'src/common/enums/order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel : Model<Order>,
    private readonly paymentService : PaymentService,
    private readonly shoppingCartService : ShoppingCartService,
    private readonly productService : ProductService,
    private readonly userService : UsersService,
    private readonly mailerService : MailerService,
    private readonly configService : ConfigService
  ){}
  async createOrder(createOrderDto : CreateOrderDto, userId : string) : Promise<string> {
    let processedProducts : {
      id : string;
      name : string
      usedQuantity : number;
    }[];
    try{
      const user = await this.userService.findOneById(userId);
      const shoppingCart = await this.shoppingCartService.getUserCart(userId);
      const order = new this.orderModel({
        ...createOrderDto,
        ...shoppingCart
      });
      const productLock = await Promise.allSettled(order.cartItems.map(async (item) => {
        const product = await this.productService.retrieveQuantity(item.productId.toString(), item.quantity);
        return {
          product,
          usedQuantity : item.quantity
        }
      }))
      processedProducts = productLock
        .filter((productSettled) => productSettled.status === "fulfilled")
        .map((r) => {
          return {
            id : r.value.product._id.toString(),
            name : r.value.product.name,
            usedQuantity : r.value.usedQuantity
          }
        })
      if(productLock.some(result => result.status === "rejected")){
        throw new Error("Unable to process all products, Rollback successful")
      }
      if(order.paymentMethod === PaymentMethod.Online){
        const payResponse = await this.paymentService.initiatePayment({
          amount : order.totalPrice * 1000,
          firstName : user.firstName,
          lastName : user.lastName,
          email : user.email,
          orderId : order._id.toString(),
          description : `Achat des produits : ${processedProducts.map((product) => product.name).join("-")}`
        });
        order.onlinePaymentRef = payResponse.paymentRef;
        //TODO send order details via email
        await this.shoppingCartService.deleteShoppingCart(shoppingCart._id.toString())
        return payResponse.payUrl;
      }
      order.status = OrderStatus.InProcessing;
      await order.save();
      await this.shoppingCartService.deleteShoppingCart(shoppingCart._id.toString())
      return this.configService.getOrThrow<string>("FRONTEND_SITE_URL");
    }catch(error){
        await Promise.all(processedProducts.map((product) => {
          this.productService.addProductQuantity(product.id, product.usedQuantity);
        }));
        return this.configService.get<string>("FRONTEND_SITE_URL") + "/failed-order"
    }
  }
  async confirmOrderOnlinePayment(paymentRef : string) : Promise<Order> {
    try{
      const order = await this.orderModel.findOne({onlinePaymentRef : paymentRef}).exec();
      order.status = OrderStatus.InProcessing;
      return await order.save();
    }catch(error){
      throw new NotFoundException("Order not found");
    }
  }
  async failOrderOnlinePayment(paymentRef : string) : Promise<Order> {
    try{
      const order = await this.orderModel.findOne({onlinePaymentRef : paymentRef}).exec();
      order.status = OrderStatus.Failed;
      await Promise.all(order.cartItems.map( async (item) => {
        return await this.productService.addProductQuantity(item.productId.toString(), item.quantity);
      }));
      await order.deleteOne();
      return order;
    }catch(error){
      throw new NotFoundException("Order not found");
    }
  }
  //TODO send order cancelation mail
  async cancelOrder(orderId : string, userId : string) : Promise<Order> {
    try{
      const order = await this.orderModel.findById(new Types.ObjectId(orderId)).exec();
      if(order.clientId.toString() !== userId){
        throw new UnauthorizedException("User Id doesn't match order's owner")
      }
      if(order.paymentMethod === PaymentMethod.Online){
        throw new ForbiddenException("Cannot cancel orders that are paid online");
      }
      order.status = OrderStatus.Failed;
      await Promise.all(order.cartItems.map(async (item) => {
        return await this.productService.addProductQuantity(item.productId.toString(), item.quantity);
      }));
      await order.deleteOne();
      return order;
    }catch(error){
      throw error;
    }
  }
  async handlePayment(paymentRef : string) : Promise<void> {
    const paymentDetails = await this.paymentService.getPaymentDetails(paymentRef);
    if(paymentDetails.payment.status === "pending"){
      return;
    }else if(paymentDetails.payment.status === "completed"){
      await this.confirmOrderOnlinePayment(paymentRef);
    }else{
      await this.failOrderOnlinePayment(paymentRef);
    }
  }
  async findOrderById(orderId : string) : Promise<Order> {
    try{
      return await this.orderModel.findById(new Types.ObjectId(orderId));
    }catch(error){
      throw new NotFoundException("Unable to find order");
    }
  }
  async findUserOrders(userId : string) {
    return await this.orderModel.find({clientId : new Types.ObjectId(userId)}).exec();
  }
}
