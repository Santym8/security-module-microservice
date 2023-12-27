import { Inject, Injectable } from '@nestjs/common';
import { Module } from '../model/Module.entity';
import { ModuleRepository } from '../repository/ModelRespository';
import { CreateModuleRequest } from '../dto/request/CreateModuleRequest';
import { ModuleException } from '../exception/ModuleException';
import { UpdateModelRequest } from '../dto/request/UpdateModuleRequest';
import { GetModuleResponse } from '../dto/response/GetModuleResponse';
import { find } from 'rxjs';

@Injectable()
export class ModulesService {
    constructor(private moduleRepository: ModuleRepository) { }

    async findAll(): Promise<GetModuleResponse[]> {
        return await this.moduleRepository.getAll();
    }

    async findOne(id: number): Promise<GetModuleResponse> {
        if (!await this.moduleRepository.getById(id)) {
            throw new ModuleException('Module not found', 404);
        }
        return await this.moduleRepository.getById(id);
    }

    async create(module: CreateModuleRequest): Promise<number> {
        if (await this.moduleRepository.getByName(module.name)) {
            throw new ModuleException('Module with that name already exists', 400);
        }

        const newModule: Module = {
            ...module,
            status: true,
            id: null
        }

        const moduleCreated = await this.moduleRepository.createOrUpdate(newModule);
        return moduleCreated.id;
    }

    async delete(id: number): Promise<void> {
        if (!await this.moduleRepository.getById(id)) {
            throw new ModuleException('Module not found', 404);
        }

        await this.moduleRepository.delete(id);
    }

    async update(id: number, module: UpdateModelRequest): Promise<void> {
        const moduleToUpdate = await this.moduleRepository.getById(id);
        if (!moduleToUpdate) {
            throw new ModuleException('Module not found', 404);
        }

        let moduleAlreadyExists = await this.moduleRepository.getByName(module.name);
        if (moduleAlreadyExists && moduleAlreadyExists.id != moduleToUpdate.id) {
            throw new ModuleException('Module with that name already exists', 400);
        }

        moduleToUpdate.name = module.name;
        moduleToUpdate.description = module.description;
        moduleToUpdate.status = module.status;

        await this.moduleRepository.createOrUpdate(moduleToUpdate);
    }
}
