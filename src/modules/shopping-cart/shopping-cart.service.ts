import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShoppingCart } from './shopping-cart.schema';
import { Model, Types } from 'mongoose';
import { CartItemDTO, CreateShoppingCartDTO } from './dto/create-shopping-cart.dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart.name) private readonly shoppingCartModel : Model<ShoppingCart>,
  ){}
  
  async createShoppingCart(shoppingCartDTO : CreateShoppingCartDTO){
    shoppingCartDTO.totalPrice = shoppingCartDTO.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    shoppingCartDTO.clientId = new Types.ObjectId(shoppingCartDTO.clientId);
    shoppingCartDTO.cartItems.forEach((item) => {
      item.productId = new Types.ObjectId(item.productId);
    })
    try{
      const shoppingCart = new this.shoppingCartModel(shoppingCartDTO);
      return await shoppingCart.save();
    }catch(error){
      throw new BadRequestException("Unable to create shopping cart", error.message);
    }
  }
  async addItem(scId : string, cartItemDto : CartItemDTO){
    try{
     const shoppingCart = await this.shoppingCartModel.findById(new Types.ObjectId(scId));
     cartItemDto.productId = new Types.ObjectId(cartItemDto.productId);
     const item = shoppingCart.cartItems.find((item) => item.productId === cartItemDto.productId)
     if(item){
      item.quantity += cartItemDto.quantity;
      shoppingCart.totalPrice += item.quantity * item.price;
     }else{
      const cartItem = {
        productId : new Types.ObjectId(cartItemDto.productId),
        name : cartItemDto.name,
        imageURL : cartItemDto.imageURL,
        price : cartItemDto.price,
        stockQuantity : cartItemDto.stockQuantity,
        quantity : cartItemDto.quantity,
      }
      shoppingCart.cartItems.push(cartItem);
      shoppingCart.totalPrice += cartItem.quantity * cartItem.price;
     }
     return await shoppingCart.save();
    }catch(error){
      throw new BadRequestException("Unable to add item ", error.message);
    }
  }

  async deleteCartItem(scId : string, itemProductId : string){
    try{
      const shoppingCart = await this.shoppingCartModel.findById(new Types.ObjectId(scId));
      shoppingCart.cartItems = shoppingCart.cartItems.filter((item)=> item.productId !== new Types.ObjectId(itemProductId));
      shoppingCart.totalPrice = shoppingCart.cartItems.reduce((acc, item)=> acc + (item.quantity * item.price), 0);
      return await shoppingCart.save();
    }catch(error){
      throw new BadRequestException("Unable to delete cart item ", error.message);
    }
  }
  async addProductQuantity(scId : string, itemProductId : string, quantity : number){
    try{
      const shoppingCart = await this.shoppingCartModel.findById(new Types.ObjectId(scId));
      const item = shoppingCart.cartItems.find((item) => item.productId === new Types.ObjectId(itemProductId));
      item.quantity += quantity;
      shoppingCart.totalPrice += item.price * quantity; 
      return await shoppingCart.save();
    }catch(error){
      throw new BadRequestException("Unable to add quantity to item ", error.message);
    }
  }
  async reduceProductQuantity(scId : string, itemProductId : string, quantity : number){
    try{
      const shoppingCart = await this.shoppingCartModel.findById(new Types.ObjectId(scId));
      const item = shoppingCart.cartItems.find((item) => item.productId === new Types.ObjectId(itemProductId));
      item.quantity -= quantity;
      shoppingCart.totalPrice -= item.price * quantity; 
      return await shoppingCart.save();
    }catch(error){
      throw new BadRequestException("Unable to add quantity to item ", error.message);
    }
  }
  async deleteShoppingCart(scId : string){
    try{
      return await this.shoppingCartModel.findByIdAndDelete(new Types.ObjectId(scId));
    }catch(error){
      throw new BadRequestException("Unable to delete shopping cart", error.message);
    }
  }
}
