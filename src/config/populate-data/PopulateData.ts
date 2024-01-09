import { Injectable, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { PopulateModuleData } from './PopulateModuleData';
import { PopulateFunctionData } from './PopulateFunctionData';
import { PopulateUserData } from './PopulateUserData';

@Injectable()
export class PopulateData implements OnApplicationBootstrap {

    constructor(
        private readonly populateModuleData: PopulateModuleData,
        private readonly populateFuntionData: PopulateFunctionData,
        private readonly populateUserData: PopulateUserData,
    ) { }

    async onApplicationBootstrap() {
        await this.populateModuleData.populateData();
        await this.populateFuntionData.populateData();
        await this.populateUserData.populateData();
    }
}