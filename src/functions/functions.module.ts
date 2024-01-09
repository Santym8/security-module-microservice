import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database/database.module';
import { FunctionsController } from './controller/FuntionsController.controller';
import { FunctionsService } from './service/FuntionsService.service';
import { FunctionRepository } from './repository/FunctionRepository';
import { ModuleRepository } from 'src/modules/repository/ModelRespository';
import { ModulesModule } from 'src/modules/modules.module';

@Module({
    imports: [DatabaseModule, ModulesModule],
    controllers: [FunctionsController],
    providers: [FunctionsService, FunctionRepository, ModuleRepository],
    exports: [FunctionRepository,]
})
export class FunctionsModule { }
