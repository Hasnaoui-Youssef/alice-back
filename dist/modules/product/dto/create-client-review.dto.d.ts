import { Types } from "mongoose";
export declare class CreateClientReviewDTO {
    clientId: string | Types.ObjectId;
    productId: string | Types.ObjectId;
    rating: number;
    comment: string;
}
