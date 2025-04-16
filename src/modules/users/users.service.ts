import { BadRequestException, Injectable, NotFoundException, Search } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model, RootFilterQuery, Types, UpdateQuery } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { UserQueryDTO } from './dto/user-query.dto';
import { PaginatedUsers } from './types';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private readonly userModel : Model<User>
    ){}

    async createUser(createUserDTO : CreateUserDTO) : Promise<User> {
        const existingUser = await this.userModel.findOne({
            email : createUserDTO.email
        });
        if(existingUser){
            throw new BadRequestException("User with this username or email already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(createUserDTO.password, salt);
        createUserDTO.password = hashedPassword;
        const newUser = new this.userModel(createUserDTO);
        return await newUser.save();
    }

    async findAllUsers(){
        return this.userModel.find();
    }


    async findAll(query : UserQueryDTO) : Promise<PaginatedUsers> {
        const options : RootFilterQuery<User> = { $and : [] };
        if(query.name){
            options.$and.push({
                $expr : {
                    $regexMatch : {
                        input : { $concat : ["$firstName", "$lastName"]},
                        regex : query.name,
                        options : 'i' 
                    },
                }
            });
        }
        if(query.email){
            options.$and.push({
                $expr : {
                    $regexMatch : {
                        input : "$email",
                        regex : query.email,
                        options : 'i' 
                    },
                }
            });
        }
        if(query.phoneNumber){
            options.$and.push({
                $expr : {
                    $regexMatch : {
                        input : "$phoneNumber",
                        regex : query.phoneNumber,
                        options : 'i' 
                    },
                }
            });
        }
        const dbQuery = this.userModel.find(options); 
        if(query.sort){
            if(query.sortBy){
                if(query.sortBy === "name"){
                    dbQuery.sort({
                        "$lastName" : query.sort,
                        "$firstName": query.sort 
                    })
                }else{
                    const property : string = `$${query.sortBy}`
                    dbQuery.sort({
                        property : query.sort
                    })
                }
            }
        }
        const pageNumber = Math.max((query.pageNumber || 1), 1); 
        const PAGE_LIMIT = 10;
        const totalUsers = await this.countDocs(options);
        if(totalUsers === 0){
            return {
                users : [],
                pageNumber : 1,
                totalUsers : 0,
                totalPages : 1
            }
        }
        const totalPages = Math.ceil(totalUsers / PAGE_LIMIT);
        if(pageNumber > totalPages){
            throw new BadRequestException(`Page number ${pageNumber}, bigger than total number of pages ${totalPages}`);
        }
        const users = await dbQuery.skip((pageNumber - 1) * PAGE_LIMIT).limit(PAGE_LIMIT).exec();
        return {
            users,
            pageNumber,
            totalUsers,
            totalPages
        }
    }
    async findOneByEmail(email : string) : Promise<User> {
        try {
            const user = await this.userModel.findOne({ email }).exec();
            return user.toObject();
        }catch(error){
            throw new NotFoundException(`User ${email} not found, ${error.message}`);
        }
    }
    async findOneById(id : string) : Promise<User> {
        try {
            const user = await this.userModel.findById(new Types.ObjectId(id)).exec();
            return user as User;
        }catch(error){
            throw new NotFoundException(`User ${id} not found, ${error.message}`);
        }

    }
    async countDocs(query : RootFilterQuery<User>) : Promise<number> {
        return await this.userModel.countDocuments(query);
    }
    async updateUser(query : RootFilterQuery<User>, data : UpdateQuery<User> ) : Promise<User> {
        try{
            const user = await this.userModel.findOneAndUpdate(query, data);
            return user;
        }catch(error){
            throw new BadRequestException("Error Updating User")
        }
    }
    async deleteUser(id : string){
        return await this.userModel.findByIdAndDelete(new Types.ObjectId(id));
    }
}
