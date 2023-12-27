import { Module } from '@nestjs/common';
import { RolesController } from './controller/RolesController';
import { RoleService } from './service/RoleService';
import { RoleRepository } from './repository/RoleRepository';
import { DatabaseModule } from 'src/config/database/database.module';
import { FunctionsModule } from 'src/functions/functions.module';

@Module({
    controllers: [RolesController],
    providers: [RoleService, RoleRepository],
    imports: [DatabaseModule, FunctionsModule]
})
export class RolesModule { }
