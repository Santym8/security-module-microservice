import { Inject, Injectable } from "@nestjs/common";
import {Role} from "../model/Role.entity";
import { RoleRepository } from "../repository/RoleRepository";
import { CreateRoleRequest } from "../dto/request/CreateRoleRequest";
import { RoleException } from "../exception/RoleException";
import { UpdateRoleRequest } from "../dto/request/UpdateRoleRequest";
import { GetRoleResponse } from "../dto/response/GetRoleResponse";

@Injectable()
export class RoleService {
    constructor(private roleRepository: RoleRepository) { }

    async findAll(): Promise<GetRoleResponse[]> {
        return await this.roleRepository.getAll();
    }

    async create(role: CreateRoleRequest): Promise<number> {
        if (await this.roleRepository.getByName(role.name)) {
            throw new RoleException('Role with that name already exists', 400);
        }

        const newRole: Role = {
            ...role,
            status: true,
            id: null,
        }

        const roleCreated = await this.roleRepository.createOrUpdate(newRole);
        return roleCreated.id;
    }

    async delete(id: number): Promise<void> {
        if (!await this.roleRepository.getById(id)) {
            throw new RoleException('Role not found', 404);
        }

        await this.roleRepository.delete(id);
    }

    async update(id: number, role: UpdateRoleRequest): Promise<void> {
        const roleToUpdate = await this.roleRepository.getById(id);
        if (!roleToUpdate) {
            throw new RoleException('Role not found', 404);
        }

        let roleAlreadyExists = await this.roleRepository.getByName(role.name);
        if (roleAlreadyExists && roleAlreadyExists.id != roleToUpdate.id) {
            throw new RoleException('Role with that name already exists', 400);
        }

        roleToUpdate.name = role.name;
        roleToUpdate.status = role.status;

        await this.roleRepository.createOrUpdate(roleToUpdate);
    }
}