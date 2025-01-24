
import { IsOptional, IsString } from "class-validator";

export class SearchQueryDTO {
    @IsOptional()
    @IsString()
    name : string;

    @IsOptional()
    @IsString()
    sort : "asc" | "desc"

    @IsOptional()
    pageNumber : number;
}