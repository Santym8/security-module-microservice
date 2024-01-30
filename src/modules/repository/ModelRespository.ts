import { Inject, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Module } from "../model/Module.entity";

@Injectable()
export class ModuleRepository {
    private moduleRepository: Repository<Module>;

    constructor(
        @Inject('DATA_SOURCE')
        private readonly dataSourceConfig: DataSource,
    ) {
        this.moduleRepository = this.dataSourceConfig.getRepository(Module);
    }

    public async createOrUpdate(module: Module): Promise<Module> {
        return await this.moduleRepository.save(module);
    }

    public async delete(id: number): Promise<void> {
        await this.moduleRepository.delete({ id: id });
    }

    public async getAll(): Promise<Module[]> {
        return await this.moduleRepository.find();
    }

    public async getById(id: number, relations?: string[]): Promise<Module> {
        if (relations) {
            return await this.moduleRepository.createQueryBuilder("module")
                .leftJoinAndSelect("module.functions", "function")
                .where("module.id = :id", { id })
                .getOne();
        } else {
            return await this.moduleRepository.findOneBy({ id: id });
        }
    }

    public async getByName(name: string): Promise<Module> {
        return await this.moduleRepository.findOneBy({ name: name });
    }
}       