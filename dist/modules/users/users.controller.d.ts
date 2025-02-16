import { UsersService } from './users.service';
import { UserQueryDTO } from './dto/user-query.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Types } from 'mongoose';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(searchQuery: UserQueryDTO): Promise<import("./types").PaginatedUsers>;
    getUserById(id: string): Promise<import("./user.schema").User>;
    updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<import("./user.schema").User>;
    deleteUser(id: string): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
