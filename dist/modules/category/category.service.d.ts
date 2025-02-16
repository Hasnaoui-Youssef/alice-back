import { Model, Types } from 'mongoose';
import { Category } from './category.schema';
export declare class CategoryService {
    private readonly categoryModel;
    constructor(categoryModel: Model<Category>);
    addCategory(name: string): Promise<import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    renameCategory(oldName: string, name: string): Promise<import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteCategory(name: string): Promise<import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAll(): Promise<(import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getOne(id: string): Promise<import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
}
