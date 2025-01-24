import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";
import { UserRoles } from "../../common/enums/roles.enum";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{
    @Prop({ required : true })
    username : string;

    @Prop({ required : true })
    password : string;

    @Prop({ required : true })
    firstName : string;

    @Prop({ required : true })
    lastName : string;

    @Prop({ required : true })
    email : string;

    @Prop({ required : true })
    phoneNumber : string;

    @Prop({ required : true })
    adress : string;

    @Prop({ required : true })
    birthDate : Date;

    @Prop({ required : true, enum: Object.values(UserRoles)})
    role : UserRoles;
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