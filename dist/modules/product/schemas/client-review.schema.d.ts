import { Types } from "mongoose";
export declare class ClientReview {
    userId: Types.ObjectId;
    productId: Types.ObjectId;
    rating: number;
    comment: string;
}
export declare const ClientReviewSchema: import("mongoose").Schema<ClientReview, import("mongoose").Model<ClientReview, any, any, any, import("mongoose").Document<unknown, any, ClientReview> & ClientReview & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ClientReview, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ClientReview>> & import("mongoose").FlatRecord<ClientReview> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
