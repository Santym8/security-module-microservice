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
            {
                name: 'SEC-USERS-READ',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-USERS-CREATE',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-USERS-UPDATE',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-USERS-DELETE',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-ROLES-READ',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-ROLES-CREATE',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-ROLES-UPDATE',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-ROLES-DELETE',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-MODULES-READ',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-MODULES-CREATE',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-MODULES-UPDATE',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-MODULES-DELETE',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-FUNCTIONS-READ',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-FUNCTIONS-CREATE',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-FUNCTIONS-UPDATE',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-FUNCTIONS-DELETE',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-FUNCTIONS-TO-ROLE-READ',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-FUNCTIONS-TO-ROLE-UPDATE',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-ROLES-TO-USER-READ',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-ROLES-TO-USER-UPDATE',
                moduleName: "SECURITY"
            },
            {
                name:'SEC-AUDIT-READ',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-AUDIT-USER-REPORT',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-USERS-ROLES-FUNCTIONS-MODULES-REPORT',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-ROLES-FUNCTION-MODULES-REPORT',
                moduleName: "SECURITY"
            },
            {
                name: 'SEC-MODULES-FUNCTIONS-REPORT',
                moduleName: "SECURITY"
            }


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