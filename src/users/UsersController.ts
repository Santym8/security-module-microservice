import { Controller, Get, Inject } from '@nestjs/common';
import { UserService } from './UserService';
import { User } from './User.entity';

@Controller('api/users')
export class UsersController {

  public constructor(
    private readonly userService: UserService,
  ) { }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }


}