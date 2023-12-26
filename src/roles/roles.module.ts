import { Module } from '@nestjs/common';
import { RolesController } from './controller/RolesController';
import { RoleService } from './service/RoleService';
import { RoleRepository } from './repository/RoleRepository';
import { DatabaseModule } from 'src/config/database/database.module';


@Module({
    controllers: [RolesController],
    providers: [RoleService, RoleRepository],
    imports: [DatabaseModule]
})
export class RolesModule { }
