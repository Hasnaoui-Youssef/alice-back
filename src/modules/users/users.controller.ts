import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserQueryDTO } from './dto/user-query.dto';
import { CheckPolicy } from 'src/common/decorators/policy.decorator';
import { ReadUserPolicyHandler } from 'src/common/policies/read-user.policy';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @CheckPolicy(new ReadUserPolicyHandler())
  @Get()
  async getUsers(@Query() searchQuery : UserQueryDTO){
    return this.usersService.findAll(searchQuery);
  }
  @CheckPolicy(new ReadUserPolicyHandler())
  @Get(":id")
  async getUserById(@Param("id") id : string){
    return this.usersService.findOneById(id);
  }
}
