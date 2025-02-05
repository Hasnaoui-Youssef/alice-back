import { InferSubjects } from "@casl/ability";
import { Product } from "src/modules/product/schemas/product.schema";
import { User } from "src/modules/users/user.schema";


export type Subjects = InferSubjects < 
    typeof User
    | typeof Product
    > |'all'