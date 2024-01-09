import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database/database.module';
import { ModulesController } from './controller/ModulesController';
import { ModulesService } from './service/ModulesService.service';
import { ModuleRepository } from './repository/ModelRespository';

@Module({
    imports: [DatabaseModule],
    controllers: [ModulesController],
    providers: [ModulesService, ModuleRepository],
    exports: [ModuleRepository]
})
export class ModulesModule { }
