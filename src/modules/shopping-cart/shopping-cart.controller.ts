import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RequestUser } from 'src/common/types/requestUser.type';
import { CartItemDTO, CreateShoppingCartDTO } from './dto/create-shopping-cart.dto';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Get()
  getUserShoppingCart(@CurrentUser() user : RequestUser){
    return this.shoppingCartService.getUserCart(user.userId);
  }
  @Post()
  createShoppingCart(@Body() createShoppingCartDTO : CreateShoppingCartDTO , @CurrentUser() user : RequestUser){
    return this.shoppingCartService.createShoppingCart(createShoppingCartDTO, user.userId);
  }
  @Post("item")
  addItem(@CurrentUser() user : RequestUser, @Body() cartItemDTO : CartItemDTO ){
    return this.shoppingCartService.addItem(user.userId, cartItemDTO);
  }
  @Delete("item")
  deleteItem(@CurrentUser() user : RequestUser, @Query("product_id") productId : string){
    return this.shoppingCartService.deleteCartItem(user.userId, productId);
  }
  @Patch("item/add")
  addQuantity(@CurrentUser() user : RequestUser, @Query("product_id") productId : string, @Query("quantity") quantity : string){
   return this.shoppingCartService.addProductQuantity(user.userId, productId, Number(quantity)) 
  }
  @Patch("item/reduce")
  reduceQuantity(@CurrentUser() user : RequestUser, @Query("product_id") productId : string, @Query("quantity") quantity : string){
   return this.shoppingCartService.reduceProductQuantity(user.userId, productId, Number(quantity)) 
  }
  @Get("all")
  getAllCarts(){
    return this.shoppingCartService.getAllCarts();  
  }

  @Get(":id")
  getShoppingCart(@Param("id") id : string){
    return this.shoppingCartService.getCartById(id);
  }

}
