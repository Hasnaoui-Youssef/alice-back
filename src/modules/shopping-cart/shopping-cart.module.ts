import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCart, ShoppingCartSchema } from './shopping-cart.schema';

@Module({
  imports : [
    MongooseModule.forFeature([
      { name : ShoppingCart.name, schema : ShoppingCartSchema }
    ])
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
  exports : [ShoppingCartService]
})
export class ShoppingCartModule {}
