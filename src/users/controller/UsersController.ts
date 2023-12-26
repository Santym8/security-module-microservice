import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../service/UserService';
import { User } from '../model/User.entity';
import { CreateUserRequest } from '../dto/request/CreateUserRequest';
import { UpdateUserRequest } from '../dto/request/UpdateUserRequest';
import { GetUserResponse } from '../dto/response/GetUserResponse';
import { UserResponse } from '../dto/response/UserResponse';

@Controller('api/users')
export class UsersController {

  public constructor(
    private readonly userService: UserService,
  ) { }

  @Get()
  getAll(): Promise<GetUserResponse[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  async get(@Param('id') id: any): Promise<GetUserResponse> {
    id = parseInt(id) || -1;
    return await this.userService.findOne(id);
  }

  @Post()
  async create(@Body() user: CreateUserRequest): Promise<UserResponse> {
    const userId = await this.userService.create(user);
    return {
      message: "User created successfully",
      id: userId
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: any): Promise<UserResponse> {
    id = parseInt(id) || -1;
    await this.userService.delete(id);
    return {
      message: "User deleted successfully",
      id: id
    }
  }

  @Put('/:id')
  async update(@Param('id') id: any, @Body() user: UpdateUserRequest): Promise<UserResponse> {
    id = parseInt(id) || -1;
    await this.userService.update(id, user);
    return {
      message: "User updated successfully",
      id: id
    }
  }



}