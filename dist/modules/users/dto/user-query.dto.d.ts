import { SearchQueryDTO } from "src/common/dto/search-query.dto";
export declare class UserQueryDTO extends SearchQueryDTO {
    email?: string;
    phoneNumber?: string;
    sortBy?: "name" | "birthDate" | "createdAt";
}
