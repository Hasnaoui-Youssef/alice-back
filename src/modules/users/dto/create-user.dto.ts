import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO {
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

}