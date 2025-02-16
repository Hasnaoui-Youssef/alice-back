import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateProductDTO } from './dto/create-product.dto';

@Public()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  async createProduct(@Body() createProductDTO : CreateProductDTO){
    return this.productService.createProduct(createProductDTO);
  }
  @Get()
  getAllProducts(){
    return this.productService.getAllProducts();
  }
  @Get("active")
  getActiveProducts(){
    return this.productService.getActiveProducts();
  }
  @Get("inactive")
  getInactiveProducts(){
    return this.productService.getInactiveProducts();
  }
  @Patch("add-quantity")
  addProductQuantity(@Body() body : { productId : string, quantity : number}){
    return this.productService.addProductQuantity(body.productId, body.quantity);
  }
  @Patch("retrieve-quantity")
  retrieveProductQuantity(@Body() body : { productId : string, quantity : number}){
    return this.productService.retrieveQuantity(body.productId, body.quantity);
  }
  @Get("reviews")
  getProductReviews(@Query("product_id") productId : string){
    return this.productService.getProductReviews(productId);
  }
  @Delete(":id")
  deleteProduct(@Param("id") productId : string){
    return this.productService.deleteProduct(productId);
  }
  @Get(":id")
  async getProductById(@Param("id") productId : string){
    const [product, reviews] = await Promise.all([
      this.productService.findProductById(productId),
      this.productService.getProductReviews(productId)
    ]);
    return {product, reviews}
  }
}
