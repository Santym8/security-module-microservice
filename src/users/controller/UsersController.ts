import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../service/UserService';
import { User } from '../model/User.entity';
import { CreateUserRequest } from '../dto/request/CreateUserRequest';
import { UpdateUserRequest } from '../dto/request/UpdateUserRequest';
import { GetUserResponse } from '../dto/response/GetUserResponse';
import { UserResponse } from '../dto/response/UserResponse';
import { AssignRolesToUserRequest } from '../dto/request/AssignRolesToUserRequest';
import { Role } from 'src/roles/model/Role.entity';
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

  @Get('/:id/roles')
  async getRoles(@Param('id') id: any): Promise<Role[]> {
    id = parseInt(id) || -1;
    return await this.userService.getRolesForUser(id);
  }

  @Post()
  async create(@Body() user: CreateUserRequest): Promise<UserResponse> {
    const userId = await this.userService.create(user);
    return {
      message: "User created successfully",
      id: userId
    }
  }

  @Post('/:id/roles')
  async assignRoles(@Param('id') id: any, @Body() request: AssignRolesToUserRequest): Promise<UserResponse> {
    id = parseInt(id) || -1;
    request.userId = id;
    await this.userService.assignRoles(request);
    return {
      message: "Roles assigned successfully",
      id: id
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