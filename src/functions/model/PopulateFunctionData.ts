import { Injectable, OnModuleInit } from '@nestjs/common';
import { FunctionRepository } from '../repository/FunctionRepository';
import { Function } from './Function.entity';
import { CreateFunctionRequest } from '../dto/request/CreateFunctionRequest';
import { ModuleRepository } from 'src/modules/repository/ModelRespository';

@Injectable()
export class PopulateFunctionData implements OnModuleInit {

    constructor(
        private readonly functionRepository: FunctionRepository,
        private moduleRespository: ModuleRepository
    ) { }

    async onModuleInit() {
        // Your data population logic goes here
        console.log('Populating Funtions');
        await this.populateData();
    }

    private async populateData() {

        const functions: { name: string, moduleName: string }[] = [
            {
                name: 'SEC-LOGIN',
                moduleName: "SECURITY"
            },
        ]

        functions.forEach(async (fun) => {
            const functionEntity = await this.functionRepository.getByName(fun.name);
            if (functionEntity) return;

            const module = await this.moduleRespository.getByName(fun.moduleName);
            await this.functionRepository.createOrUpdate({
                id: null,
                name: fun.name,
                status: true,
                module: module
            });
        });
    }
}