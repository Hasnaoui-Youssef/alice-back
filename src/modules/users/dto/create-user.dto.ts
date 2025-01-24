import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    username : string;

    @IsNotEmpty()
    @IsString()
    password : string;

    @IsNotEmpty()
    @IsString()
    firstName : string;

    @IsNotEmpty()
    @IsString()
    lastName : string;

    @IsNotEmpty()
    @IsString()
    email : string;

    @IsNotEmpty()
    @IsString()
    phoneNumber : string;

    @IsNotEmpty()
    @IsString()
    adress : string;

    @IsNotEmpty()
    @IsString()
    profileAvatarUrl : string;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    birthDate : Date;

}