import { InferSubjects } from "@casl/ability";
import { Category } from "src/modules/category/category.schema";
import { Order } from "src/modules/order/order.schema";
import { ClientReview } from "src/modules/product/schemas/client-review.schema";
import { Product } from "src/modules/product/schemas/product.schema";
import { ShoppingCart } from "src/modules/shopping-cart/shopping-cart.schema";
import { User } from "src/modules/users/user.schema";


export type Subjects = InferSubjects < 
    typeof User
    | typeof Product
    | typeof ClientReview
    | typeof Order
    | typeof ShoppingCart
    | typeof Category
    > |'all'