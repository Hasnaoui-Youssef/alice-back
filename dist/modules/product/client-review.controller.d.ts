import { ProductService } from "./product.service";
import { RequestUser } from "src/common/types/requestUser.type";
import { CreateClientReviewDTO } from "./dto/create-client-review.dto";
import { UpdateClientReviewDTO } from "./dto/update-client-review.dto";
export declare class ClientReviewController {
    private readonly productService;
    constructor(productService: ProductService);
    createClientReview(user: RequestUser, productId: string, createClientReviewDTO: CreateClientReviewDTO): Promise<import("mongoose").Document<unknown, {}, import("./schemas/client-review.schema").ClientReview> & import("./schemas/client-review.schema").ClientReview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteClientReview(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/client-review.schema").ClientReview> & import("./schemas/client-review.schema").ClientReview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateClientReview(id: string, updateClientReviewDTO: UpdateClientReviewDTO): Promise<import("mongoose").Document<unknown, {}, import("./schemas/client-review.schema").ClientReview> & import("./schemas/client-review.schema").ClientReview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
