import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ProductService } from '../product/product.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

@Public()
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService : ProductService,
  ) {}
  @Get()
  getCategories(){
    return this.categoryService.getAll();
  }
  @Get("products")
  getCategoryProducts(@Query("category_id") catId : string){
    return this.productService.getCategoryProducts(catId);
  }
  @Post()
  createCategory(@Body(new ValidationPipe()) body : { name : string }){
    return this.categoryService.addCategory(body.name);
  }
  @Patch(":name")
  updateCategory(@Body(new ValidationPipe()) body : {name : string}, @Param("name") oldName : string){
    return this.categoryService.renameCategory(oldName, body.name)
  }
  @Delete(":name")
  deleteCategory(@Param("name") name : string){
    return this.categoryService.deleteCategory(name);
  }

}
