import { Global, Module } from '@nestjs/common';
import { UsersController } from './controller/UsersController';
import { UserService } from './service/UserService';
import { UserRepository } from './repository/UserRepository';
import { RolesModule } from 'src/roles/roles.module';
import { FunctionsModule } from 'src/functions/functions.module';

@Global()
@Module({
    controllers: [UsersController],
    providers: [UserService, UserRepository],
    imports: [RolesModule, FunctionsModule],
    exports: [UserRepository]
})
export class UsersModule { }
