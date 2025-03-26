import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CheckPolicy } from 'src/common/decorators/policy.decorator';
import { ReadUserPolicyHandler } from 'src/common/policies/read-user.policy';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Types } from 'mongoose';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RequestUser } from 'src/common/types/requestUser.type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get()
  async getUsers(@CurrentUser() user : RequestUser){
    return this.usersService.findOneById(user.userId);
  }
  @CheckPolicy(new ReadUserPolicyHandler())
  @Get(":id")
  async getUserById(@Param("id") id : string){
    return this.usersService.findOneById(id);
  }
  @Patch(":id")
  async updateUser(@Param("id") id : string, @Body() updateUserDTO : UpdateUserDTO){
    return this.usersService.updateUser({_id : new Types.ObjectId(id)}, updateUserDTO);
  }
  @Delete(":id")
  async deleteUser(@Param("id") id : string){
    return this.usersService.deleteUser(id);
  }
}
