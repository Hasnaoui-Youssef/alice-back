import { IsOptional, IsString } from "class-validator";
import { SearchQueryDTO } from "src/common/dto/search-query.dto";

export class UserQueryDTO extends SearchQueryDTO {
    @IsOptional()
    @IsString()
    email : string;

    @IsOptional()
    @IsString()
    phoneNumber : string;

    @IsOptional()
    @IsString()
    sortBy : "name" | "birthDate" | "createdAt";
}