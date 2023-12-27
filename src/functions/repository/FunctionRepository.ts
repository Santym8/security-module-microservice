import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Function } from '../model/Function.entity';
import { GetFunctionResponse } from '../dto/response/GetFunctionResponse';

@Injectable()
export class FunctionRepository {
    private functionRepository: Repository<Function>;

    constructor(
        @Inject('DATA_SOURCE')
        private readonly dataSourceConfig: DataSource,
    ) {
        this.functionRepository = this.dataSourceConfig.getRepository(Function);
    }

    public async createOrUpdate(func: Function): Promise<Function> {
        return this.functionRepository.save(func);
    }

    public async delete(id: number): Promise<void> {
        await this.functionRepository.delete({ id: id });
    }

    public async getAll(): Promise<GetFunctionResponse[]> {
        const functions = await this.functionRepository.createQueryBuilder('func')
            .innerJoinAndSelect('func.module', 'module')
            .getMany();

        return functions.map(func => ({
            id: func.id,
            name: func.name,
            status: func.status,
            module: {
                id: func.module.id,
                name: func.module.name,
                description: func.module.description,  // Ajusta según la estructura real de Module
                status: func.module.status,
            },
        }));
    }

    public async getById(id: number): Promise<GetFunctionResponse | null> {
        const func = await this.functionRepository.createQueryBuilder('func')
            .innerJoinAndSelect('func.module', 'module')
            .where('func.id = :id', { id })
            .getOne();

        return func
            ? {
                id: func.id,
                name: func.name,
                status: func.status,
                module: {
                    id: func.module.id,
                    name: func.module.name,
                    description: func.module.description,
                    status: func.module.status,
                },
            }
            : null;
    }

    public async getByName(name: string): Promise<Function> {
        return await this.functionRepository.findOneBy({ name: name });
    }

}