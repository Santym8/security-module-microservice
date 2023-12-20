import { Module } from '@nestjs/common';
import { UsersController } from './controller/UsersController';
import { UserService } from './service/UserService';
import { UserRepository } from './repository/UserRepository';
import { DatabaseModule } from 'src/config/database/database.module';

@Module({
    controllers: [UsersController],
    providers: [UserService, UserRepository],
    imports: [DatabaseModule]
})
export class UsersModule { }
