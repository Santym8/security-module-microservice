import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRepository } from '../repository/ModelRespository';
import { CreateModuleRequest } from '../dto/request/CreateModuleRequest';
import { Module } from './Module.entity';

@Injectable()
export class PopulateModuleData implements OnModuleInit {

    constructor(private readonly moduleRepository: ModuleRepository) { }

    async onModuleInit() {
        // Your data population logic goes here
        console.log('Populating Modules');
        await this.populateData();
    }

    private async populateData() {

        const modules: CreateModuleRequest[] = [
            {
                name: 'SECURITY',
                description: 'SECURITY MODULE',
            }
        ]

        modules.forEach(async (module) => {
            const moduleEntity = await this.moduleRepository.getByName(module.name);
            
            if (moduleEntity) return;

            await this.moduleRepository.createOrUpdate({
                id: null,
                name: module.name,
                description: module.description,
                status: true,
            });
        });
    }
}