import { Inject, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Role } from "../model/Role.entity";

@Injectable()
export class RoleRepository {

    private roleRepository: Repository<Role>;

    constructor(
        @Inject('DATA_SOURCE')
        private readonly dataSourceConfig: DataSource,
    ) {
        this.roleRepository = this.dataSourceConfig.getRepository(Role);
    }

    public async createOrUpdate(role: Role): Promise<Role> {
        return this.roleRepository.save(role);
    }
    public async delete(id: number): Promise<void> {
        await this.roleRepository.delete({ id: id });
    }
    public async getAll(): Promise<Role[]> {
        return await this.roleRepository.find();
    }
    public async getById(id: number, relations?: string[]): Promise<Role> {
        if (relations) {
            return await this.roleRepository.createQueryBuilder("role")
                .leftJoinAndSelect("role.functions", "function")
                .where("role.id = :id", { id })
                .getOne();
        } else {
            return await this.roleRepository.findOneBy({id: id});
        }
    }
    public async getByName(name: string): Promise<Role> {
        return await this.roleRepository.findOneBy({ name: name });
    }
}