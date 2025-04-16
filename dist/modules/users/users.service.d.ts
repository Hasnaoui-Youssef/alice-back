import { User } from './user.schema';
import { Model, RootFilterQuery, Types, UpdateQuery } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserQueryDTO } from './dto/user-query.dto';
import { PaginatedUsers } from './types';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    createUser(createUserDTO: CreateUserDTO): Promise<User>;
    findAllUsers(): Promise<(import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findAll(query: UserQueryDTO): Promise<PaginatedUsers>;
    findOneByEmail(email: string): Promise<User>;
    findOneById(id: string): Promise<User>;
    countDocs(query: RootFilterQuery<User>): Promise<number>;
    updateUser(query: RootFilterQuery<User>, data: UpdateQuery<User>): Promise<User>;
    deleteUser(id: string): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
