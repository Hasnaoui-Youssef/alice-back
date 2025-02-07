import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { ClientReview, ClientReviewSchema } from './schemas/client-review.schema';

@Module({
  imports : [
    MongooseModule.forFeature([
      { name : Product.name, schema : ProductSchema},
      { name : ClientReview.name, schema : ClientReviewSchema },
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
