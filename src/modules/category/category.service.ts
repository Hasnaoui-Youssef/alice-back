import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Category } from './category.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel : Model<Category>,
  ){}
  async addCategory(name : string){
    const category = new this.categoryModel({name});
    return await category.save();
  }
  async renameCategory(oldName : string ,name : string){
    return await this.categoryModel.findOneAndUpdate({name : oldName}, {name})
  }
  async deleteCategory(name : string){
    return await this.categoryModel.findOneAndDelete({name});
  }
  async getAll(){
    return await this.categoryModel.find().select("name");
  }
  async getOne(id : string){
    return await this.categoryModel.findById(new Types.ObjectId(id));
  }
}
