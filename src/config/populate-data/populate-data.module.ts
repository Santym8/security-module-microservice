import { Module } from '@nestjs/common';
import { FunctionsModule } from 'src/functions/functions.module';
import { ModulesModule } from 'src/modules/modules.module';
import { UsersModule } from 'src/users/users.module';
import { PopulateFunctionData } from './PopulateFunctionData';
import { PopulateModuleData } from './PopulateModuleData';
import { PopulateUserData } from './PopulateUserData';
import { PopulateData } from './PopulateData';

@Module({
    imports: [UsersModule, ModulesModule, FunctionsModule],
    providers: [PopulateData, PopulateModuleData, PopulateFunctionData, PopulateUserData, ],
})
export class PopulateDataModule { }
