import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database/database.module';
import { ModulesController } from './controller/ModulesController';
import { ModulesService } from './service/ModulesService.service';
import { ModuleRepository } from './repository/ModelRespository';
import { PopulateModuleData } from './model/PopulateModuleData';

@Module({
    imports: [DatabaseModule],
    controllers: [ModulesController],
    providers: [ModulesService, ModuleRepository, PopulateModuleData],
    exports: [ModuleRepository]
})
export class ModulesModule { }
