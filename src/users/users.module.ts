import { Module } from '@nestjs/common';
import { UsersController } from './UsersController';
import { UserService } from './UserService';
import { UserRepository } from './UserRepository';
import { DatabaseModule } from 'src/config/database/database.module';

@Module({
    controllers: [UsersController],
    providers: [UserService, UserRepository],
    imports: [DatabaseModule]
})
export class UsersModule { }
