import { Module } from '@nestjs/common';
import { UsersController } from './controller/UsersController';
import { UserService } from './service/UserService';
import { UserRepository } from './repository/UserRepository';
import { DatabaseModule } from 'src/config/database/database.module';
import { RolesModule } from 'src/roles/roles.module';
import { FunctionsModule } from 'src/functions/functions.module';
import { PopulateUserData } from './model/PopulateUserData';

@Module({
    controllers: [UsersController],
    providers: [UserService, UserRepository, PopulateUserData],
    imports: [DatabaseModule, RolesModule, FunctionsModule],
    exports: [UserRepository]
})
export class UsersModule { }
