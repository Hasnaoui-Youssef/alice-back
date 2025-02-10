import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';
import { ShoppingCartModule } from '../shopping-cart/shopping-cart.module';
import { ProductModule } from '../product/product.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports : [
    MongooseModule.forFeature([
      { name : Order.name, schema : OrderSchema }
    ]),
    ShoppingCartModule,
    ProductModule,
    UsersModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
