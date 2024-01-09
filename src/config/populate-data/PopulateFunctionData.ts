import { Injectable } from '@nestjs/common';
import { FunctionRepository } from '../../functions/repository/FunctionRepository';
import { ModuleRepository } from 'src/modules/repository/ModelRespository';

@Injectable()
export class PopulateFunctionData {

    constructor(
        private readonly functionRepository: FunctionRepository,
        private moduleRespository: ModuleRepository
    ) { }


    public async populateData() {
        console.log('Populating functions...');

        const functions: { name: string, moduleName: string }[] = [
            {
                name: 'SEC-LOGIN',
                moduleName: "SECURITY"
            },
        ]

        await Promise.all(functions.map(async (fun) => {
            const functionEntity = await this.functionRepository.getByName(fun.name);
            if (functionEntity) {
                console.log(`Function ${fun.name} already exists`);
                return;
            }

            const module = await this.moduleRespository.getByName(fun.moduleName);
            if (!module) throw new Error(`Module ${fun.moduleName} not found`);

            const funtionCreated = await this.functionRepository.createOrUpdate({
                id: null,
                name: fun.name,
                status: true,
                module: module
            });

            if (!funtionCreated) throw new Error(`Error creating function ${fun.name}`);
        }));
    }
}