import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShoppingCart } from './shopping-cart.schema';
import { Model, Types } from 'mongoose';
import { CartItemDTO, CreateShoppingCartDTO } from './dto/create-shopping-cart.dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart.name) private readonly shoppingCartModel : Model<ShoppingCart>,
  ){}
  
  async createShoppingCart(shoppingCartDTO : CreateShoppingCartDTO, userId : string){
    shoppingCartDTO.totalPrice = shoppingCartDTO.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    shoppingCartDTO.clientId = new Types.ObjectId(userId);
    shoppingCartDTO.cartItems.forEach((item) => {
      item.productId = new Types.ObjectId(item.productId);
    })
    const check = await this.shoppingCartModel.findOne({clientId : shoppingCartDTO.clientId}).exec();
    if(check){
      throw new ForbiddenException("User already has cart")
    }
    try{
      const shoppingCart = new this.shoppingCartModel(shoppingCartDTO);
      shoppingCart.totalPrice = shoppingCart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      return await shoppingCart.save();
    }catch(error){
      throw new BadRequestException("Unable to create shopping cart ", error.message);
    }
  }
  async getAllCarts(){
    return await this.shoppingCartModel.find();
  }
  async getCartById(scId : string) : Promise<ShoppingCart>{
    try{
      return await this.shoppingCartModel.findById(new Types.ObjectId(scId));
    }catch(error){
      throw new NotFoundException("Cart not found")
    }
  }
  async getUserCart(userId : string) : Promise<ShoppingCart>{
    try{
      return await this.shoppingCartModel.findOne({clientId : new Types.ObjectId(userId)}).exec();
    }catch(error){
      throw new NotFoundException("Coulnd't find cart for user ")
    }
  }
  async addItem(userId : string, cartItemDto : CartItemDTO){
    try{
     const shoppingCart = await this.shoppingCartModel.findOne({clientId : new Types.ObjectId(userId)});
     if(!shoppingCart){
      const newShoppingCart = await this.createShoppingCart({
        cartItems : [cartItemDto],
      }, userId);
      return newShoppingCart;
     }
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

  async deleteCartItem(userId : string, itemProductId : string){
    try{
      const shoppingCart = await this.shoppingCartModel.findOne({ clientId : new Types.ObjectId(userId)});
      shoppingCart.cartItems = shoppingCart.cartItems.filter((item)=> item.productId !== new Types.ObjectId(itemProductId));
      shoppingCart.totalPrice = shoppingCart.cartItems.reduce((acc, item)=> acc + (item.quantity * item.price), 0);
      return await shoppingCart.save();
    }catch(error){
      throw new BadRequestException("Unable to delete cart item ", error.message);
    }
  }
  async addProductQuantity(userId : string, itemProductId : string, quantity : number){
    try{
      const shoppingCart = await this.shoppingCartModel.findOne({ clientId : new Types.ObjectId(userId)});
      const item = shoppingCart.cartItems.find((item) => item.productId === new Types.ObjectId(itemProductId));
      item.quantity += quantity;
      shoppingCart.totalPrice += item.price * quantity; 
      return await shoppingCart.save();
    }catch(error){
      throw new BadRequestException("Unable to add quantity to item ", error.message);
    }
  }
  async reduceProductQuantity(userId : string, itemProductId : string, quantity : number){
    try{
      const shoppingCart = await this.shoppingCartModel.findOne({ clientId : new Types.ObjectId(userId)});
      const item = shoppingCart.cartItems.find((item) => item.productId === new Types.ObjectId(itemProductId));
      if(item.quantity <= quantity){
        return await this.deleteCartItem(userId, itemProductId);
      }
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
