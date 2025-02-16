import { ShoppingCart } from './shopping-cart.schema';
import { Model, Types } from 'mongoose';
import { CartItemDTO, CreateShoppingCartDTO } from './dto/create-shopping-cart.dto';
export declare class ShoppingCartService {
    private readonly shoppingCartModel;
    constructor(shoppingCartModel: Model<ShoppingCart>);
    createShoppingCart(shoppingCartDTO: CreateShoppingCartDTO, userId: string): Promise<import("mongoose").Document<unknown, {}, ShoppingCart> & ShoppingCart & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getAllCarts(): Promise<(import("mongoose").Document<unknown, {}, ShoppingCart> & ShoppingCart & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getCartById(scId: string): Promise<ShoppingCart>;
    getUserCart(userId: string): Promise<ShoppingCart>;
    addItem(userId: string, cartItemDto: CartItemDTO): Promise<import("mongoose").Document<unknown, {}, ShoppingCart> & ShoppingCart & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    deleteCartItem(userId: string, itemProductId: string): Promise<import("mongoose").Document<unknown, {}, ShoppingCart> & ShoppingCart & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    addProductQuantity(userId: string, itemProductId: string, quantity: number): Promise<import("mongoose").Document<unknown, {}, ShoppingCart> & ShoppingCart & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    reduceProductQuantity(userId: string, itemProductId: string, quantity: number): Promise<import("mongoose").Document<unknown, {}, ShoppingCart> & ShoppingCart & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    deleteShoppingCart(scId: string): Promise<import("mongoose").Document<unknown, {}, ShoppingCart> & ShoppingCart & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
