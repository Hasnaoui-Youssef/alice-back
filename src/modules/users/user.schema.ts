import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";
import { UserRoles } from "../../common/enums/roles.enum";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{

    @Prop({ type : SchemaTypes.ObjectId, auto : true})
    _id : Types.ObjectId;

    @Prop({ required : true })
    password : string;

    @Prop({ required : true })
    firstName : string;

    @Prop({ required : true })
    lastName : string;

    @Prop({ required : true })
    email : string;

    @Prop({ required : true, enum: Object.values(UserRoles), default : UserRoles.Client})
    role : UserRoles;

    @Prop({ type : [Types.ObjectId], default : [], ref:"Order" })
    orders : Types.ObjectId[];

    @Prop({ required : false})
    jit? : string;

    @Prop({ required : true, default: false})
    isActivated : boolean;
    /*
    *** TODO : add these fields for further protection
    @Prop({ required : true })
    lastLogin : Date

    @Prop({default : 0})
    loginAttempts : number;

    @Prop({ required : false })
    profileAvatarUrl : string;
    */
}

export const UserSchema = SchemaFactory.createForClass(User);