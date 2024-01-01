import { Injectable, NotFoundException } from '@nestjs/common';
import { Function } from '../model/Function.entity';
import { FunctionRepository } from '../repository/FunctionRepository';
import { ModuleRepository } from 'src/modules/repository/ModelRespository';
import { CreateFunctionRequest } from '../dto/request/CreateFunctionRequest';
import { FuntionException } from '../exception/FuntionException';
import { UpdateFunctionRequest } from '../dto/request/UpdateFunctionRequest';
import { GetFunctionResponse } from '../dto/response/GetFunctionResponse';

@Injectable()
export class FunctionsService {
    constructor(private functionRepository: FunctionRepository, private moduleRespository: ModuleRepository) { }

    async findAll(): Promise<GetFunctionResponse[]> {
        return await this.functionRepository.getAll();
    }

    async findOne(id: number): Promise<GetFunctionResponse> {
        const func = await this.functionRepository.getById(id);
        if (!func) {
            throw new FuntionException('Function not found', 404);
        }
        return func;
    }

    async create(func: CreateFunctionRequest): Promise<number> {
        if (await this.functionRepository.getByName(func.name)) {
            throw new FuntionException('Function with that name already exists', 400);
        }

        const module = await this.moduleRespository.getById(func.moduleId);

        if (!module) {
            throw new NotFoundException(`Module with id ${func.moduleId} not found`);
        }

        const newFunction: Function = {
            ...func,
            status: true,
            id: null,
            module: module,
        };

        const functionCreated = await this.functionRepository.createOrUpdate(newFunction);
        return functionCreated.id;
    }

    async delete(id: number): Promise<void> {
        if (!await this.functionRepository.getById(id)) {
            throw new FuntionException('Function not found', 404);
        }

        await this.functionRepository.delete(id).catch(() => {
            throw new FuntionException('Function has dependencies', 400);
        });
    }

    async update(id: number, updateFunctionRequest: UpdateFunctionRequest): Promise<void> {
        const functionToUpdate = await this.functionRepository.getById(id);
        if (!functionToUpdate) {
            throw new NotFoundException(`Function with id ${id} not found`);
        }

        let functionAlreadyExists = await this.functionRepository.getByName(updateFunctionRequest.name);
        if (functionAlreadyExists && functionAlreadyExists.id !== functionToUpdate.id) {
            throw new FuntionException('Function with that name already exists', 400);
        }

        functionToUpdate.name = updateFunctionRequest.name;
        functionToUpdate.status = updateFunctionRequest.status;

        if (updateFunctionRequest.moduleId !== undefined) {
            const moduleToUpdate = await this.moduleRespository.getById(updateFunctionRequest.moduleId);

            if (!moduleToUpdate) {
                throw new NotFoundException(`Module with id ${updateFunctionRequest.moduleId} not found`);
            }

            functionToUpdate.module = moduleToUpdate;
        }

        await this.functionRepository.createOrUpdate(functionToUpdate);
    }
}
