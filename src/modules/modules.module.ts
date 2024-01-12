import { Module } from '@nestjs/common';
import { ModulesController } from './controller/ModulesController';
import { ModulesService } from './service/ModulesService.service';
import { ModuleRepository } from './repository/ModelRespository';

@Module({
    imports: [],
    controllers: [ModulesController],
    providers: [ModulesService, ModuleRepository],
    exports: [ModuleRepository]
})
export class ModulesModule { }
