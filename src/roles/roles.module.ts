import { Module } from '@nestjs/common';
import { RolesController } from './controller/RolesController';
import { RoleService } from './service/RoleService';
import { RoleRepository } from './repository/RoleRepository';
import { FunctionsModule } from 'src/functions/functions.module';

@Module({
    controllers: [RolesController],
    providers: [RoleService, RoleRepository],
    imports: [FunctionsModule],
    exports: [RoleRepository]
})
export class RolesModule { }
