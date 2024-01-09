import { Injectable } from '@nestjs/common';
import { ModuleRepository } from '../../modules/repository/ModelRespository';
import { CreateModuleRequest } from '../../modules/dto/request/CreateModuleRequest';

@Injectable()
export class PopulateModuleData {

    constructor(private readonly moduleRepository: ModuleRepository) { }

    public async populateData() {
        console.log('Populating modules...');

        const modules: CreateModuleRequest[] = [
            {
                name: 'SECURITY',
                description: 'SECURITY MODULE',
            }
        ]

        await Promise.all(modules.map(async (module) => {
            const moduleEntity = await this.moduleRepository.getByName(module.name);

            if (moduleEntity) {
                console.log(`Module ${module.name} already exists`);
                return;
            }

            const moduleCreated = await this.moduleRepository.createOrUpdate({
                id: null,
                name: module.name,
                description: module.description,
                status: true,
            });

            if (!moduleCreated) throw new Error(`Error creating module ${module.name}`);
        }));
    }
}