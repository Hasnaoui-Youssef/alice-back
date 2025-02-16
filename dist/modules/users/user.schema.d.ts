import { HydratedDocument, Types } from "mongoose";
import { UserRoles } from "../../common/enums/roles.enum";
export type UserDocument = HydratedDocument<User>;
export declare class User {
    _id: Types.ObjectId;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRoles;
    orders: Types.ObjectId[];
    jit?: string;
    isActivated: boolean;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
