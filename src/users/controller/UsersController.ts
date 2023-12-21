import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../service/UserService';
import { User } from '../model/User.entity';
import { UserDto } from '../dto/UserDto';

@Controller('api/users')
export class UsersController {

  public constructor(
    private readonly userService: UserService,
  ) { }

  @Get()
  getAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() user: UserDto): Promise<UserDto> {
    return this.userService.create(user);
  }

  @Delete('/:username')
  delete(@Param('username') username: string): Promise<void> {
    return this.userService.delete(username);
  }



}