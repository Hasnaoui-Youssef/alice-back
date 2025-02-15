import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model, Types } from 'mongoose';
import { ClientReview } from './schemas/client-review.schema';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { CreateClientReviewDTO } from './dto/create-client-review.dto';
import { UpdateClientReviewDTO } from './dto/update-client-review.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel : Model<Product>,
    @InjectModel(ClientReview.name) private readonly clientReviewModel : Model<ClientReview>,
  ){}
  async createProduct(createProductDTO : CreateProductDTO){
    try{
      if(typeof createProductDTO.category === "string"){
        createProductDTO.category = new Types.ObjectId(createProductDTO.category);
      } 
      const product = new this.productModel(createProductDTO);
      return await product.save();
    }catch(error){
      throw new BadRequestException("Unable to create new product : ", error.message);
    }
  }

  async getCategoryProducts(categoryId : string){
    return await this.productModel.find({category : new Types.ObjectId(categoryId)});
  }

  async getAllProducts(){
    return await this.productModel.find().select("name description imageUrl category price").populate<{category : string}>("category");
  }

  async getActiveProducts(){
    return await this.productModel.find({isActive : true}).select("name description imageUrl category price").populate<{category : string}>("category");
  }

  async getInactiveProducts(){
    return await this.productModel.find({isActive : false}).select("name description imageUrl category price").populate<{category : string}>("category");
  }

  async findProductByName(name : string){
    try{
      return await this.productModel.findOne({name}).exec();
    }catch(error){
      throw new NotFoundException("Product Not found")
    }
  }

  async findProductById(id : string){
    try{
      return await this.productModel.findById(new Types.ObjectId(id)).exec();
    }catch(error){
      throw new NotFoundException("Product Not found")
    }
  }

  async addProductQuantity(productId : string, quantity : number){
    try{
      if(quantity <= 0){
        throw new Error("Quantity should be bigger than 0")
      }
      return await this.productModel.findByIdAndUpdate(new Types.ObjectId(productId), { $inc : {quantity}});
    }catch(error){
      throw new BadRequestException("Unable to add product quantity ", error.message);
    }
  }
  async updateProduct(productId : string, updateProductDTO : UpdateProductDTO){
    try{
      return await this.productModel.findOneAndUpdate(new Types.ObjectId(productId), updateProductDTO, {new : true, runValidators : true})
    }catch(error){
      throw new BadRequestException("Unable to update product ", error.message);
    }
  }
  async retrieveQuantity(productId : string, quantity : number) : Promise<Product> {
    try{
      const product = await this.productModel.findById(new Types.ObjectId(productId));
      if(product.quantity < quantity){
        throw new Error("Insufficient stock");
      }
      product.quantity -= quantity;
      if(product.quantity === 0){
        product.isActive = false;
      }
      return await product.save({ validateBeforeSave : true, validateModifiedOnly : true})
    }catch(error){
      throw new BadRequestException("Unable to retrieve quantity ", error.message);
    }
  }
  async deleteProduct(productId : string){
    try{
      const product = await this.productModel.findByIdAndDelete(new Types.ObjectId(productId));
      await this.deleteProductReviews(product._id);
      return product;
    }catch(error){
      throw new BadRequestException("Unable to delete product ", error.message);
    }
  }
  async createClientReview(createClientReviewDTO : CreateClientReviewDTO){
    try{
      createClientReviewDTO.productId = new Types.ObjectId(createClientReviewDTO.productId);
      createClientReviewDTO.clientId = new Types.ObjectId(createClientReviewDTO.clientId);
      const product = await this.productModel.findById(createClientReviewDTO.productId);
      const totalRating = product.averageRating * product.reviewsNumber;
      const newRating = (totalRating + createClientReviewDTO.rating) / (product.reviewsNumber + 1);
      const clientReview = new this.clientReviewModel(createClientReviewDTO);
      const review = await clientReview.save();
      product.averageRating = newRating;
      product.reviewsNumber += 1;
      await product.save();
      return review;
    }catch(error){
      throw new BadRequestException("Cannot Create Review ", error.message);
    }
  }

  async updateClientReview(crId : string, updateClientReviewDTO : UpdateClientReviewDTO){
    try{
      return await this.clientReviewModel.findByIdAndUpdate(new Types.ObjectId(crId), updateClientReviewDTO);
    }catch(error){
      throw new BadRequestException("Cannot update review ", error.message);
    }
  }
  async deleteClientReview(crId : string){
    try{
      const clientReview = await this.clientReviewModel.findByIdAndDelete(new Types.ObjectId(crId));
      const product = await this.productModel.findById(clientReview.productId);
      const totalRating = product.averageRating * product.reviewsNumber;
      const newRating = (totalRating - clientReview.rating) / (product.reviewsNumber - 1);
      product.averageRating = newRating;
      product.reviewsNumber -= 1;
      await product.save();
      return clientReview;
    }catch(error){
      throw new BadRequestException("Cannot Delete review ", error.message);
    }
  }
  async getClientReview(crId : string){
    try{
      return await this.clientReviewModel.findById(new Types.ObjectId(crId));
    }catch(error){
      throw new NotFoundException("Cannot find Review")
    }
  }
  async getProductReviews(productId : string){
    try{
      return await this.clientReviewModel.find({productId : new Types.ObjectId(productId)});
    }catch(error){
      throw new BadRequestException("Cannot find reviews for product ", error.message)
    }
  }
  async deleteProductReviews(productId : Types.ObjectId){
    try{
      return await this.clientReviewModel.deleteMany({productId});
    }catch(error){
      throw new BadRequestException("Cannot delete reviews for product ", error.message);
    }
  }
}
