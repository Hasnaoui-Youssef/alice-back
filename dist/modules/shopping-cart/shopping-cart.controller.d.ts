import { ShoppingCartService } from './shopping-cart.service';
import { RequestUser } from 'src/common/types/requestUser.type';
import { CartItemDTO, CreateShoppingCartDTO } from './dto/create-shopping-cart.dto';
export declare class ShoppingCartController {
    private readonly shoppingCartService;
    constructor(shoppingCartService: ShoppingCartService);
    getUserShoppingCart(user: RequestUser): Promise<import("./shopping-cart.schema").ShoppingCart>;
    createShoppingCart(createShoppingCartDTO: CreateShoppingCartDTO, user: RequestUser): Promise<import("mongoose").Document<unknown, {}, import("./shopping-cart.schema").ShoppingCart> & import("./shopping-cart.schema").ShoppingCart & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    addItem(user: RequestUser, cartItemDTO: CartItemDTO): Promise<import("mongoose").Document<unknown, {}, import("./shopping-cart.schema").ShoppingCart> & import("./shopping-cart.schema").ShoppingCart & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    deleteItem(user: RequestUser, productId: string): Promise<import("mongoose").Document<unknown, {}, import("./shopping-cart.schema").ShoppingCart> & import("./shopping-cart.schema").ShoppingCart & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    addQuantity(user: RequestUser, productId: string, quantity: string): Promise<import("mongoose").Document<unknown, {}, import("./shopping-cart.schema").ShoppingCart> & import("./shopping-cart.schema").ShoppingCart & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    reduceQuantity(user: RequestUser, productId: string, quantity: string): Promise<import("mongoose").Document<unknown, {}, import("./shopping-cart.schema").ShoppingCart> & import("./shopping-cart.schema").ShoppingCart & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getAllCarts(): Promise<(import("mongoose").Document<unknown, {}, import("./shopping-cart.schema").ShoppingCart> & import("./shopping-cart.schema").ShoppingCart & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getShoppingCart(userId: string): Promise<import("./shopping-cart.schema").ShoppingCart>;
}
