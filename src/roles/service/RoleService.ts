import { Inject, Injectable } from "@nestjs/common";
import { Role } from "../model/Role.entity";
import { RoleRepository } from "../repository/RoleRepository";
import { CreateRoleRequest } from "../dto/request/CreateRoleRequest";
import { RoleException } from "../exception/RoleException";
import { UpdateRoleRequest } from "../dto/request/UpdateRoleRequest";
import { GetRoleResponse } from "../dto/response/GetRoleResponse";
import { AssignFunctionsToRoleRequest } from "../dto/request/AssignFunctionsToRoleRequest";
import { FunctionRepository } from "../../functions/repository/FunctionRepository";
import { Function } from "../../functions/model/Function.entity";
import { GetFunctionResponse } from "../../functions/dto/response/GetFunctionResponse";

@Injectable()
export class RoleService {
    constructor(
        private roleRepository: RoleRepository,
        private functionRepository: FunctionRepository,
    ) { }

    async findAll(): Promise<GetRoleResponse[]> {
        return await this.roleRepository.getAll();
    }

    async findOne(id: number): Promise<GetRoleResponse> {
        const role = await this.roleRepository.getById(id);
        if (!role) {
            throw new RoleException('Role not found', 404);
        }
        return role;
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

        await this.roleRepository.delete(id).catch(() => {
            throw new RoleException('Role has dependencies', 400);
        });
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

    async assignFunctions(request: AssignFunctionsToRoleRequest): Promise<void> {
        if (!Number.isInteger(request.roleId)) {
            throw new RoleException('Invalid roleId', 400);
        }
        const role = await this.roleRepository.getById(request.roleId);
        if (!role) {
            throw new RoleException('Role not found', 404);
        }
        const functions = await Promise.all(request.functionIds.map(id => this.functionRepository.getById(id)));
        role.functions = functions;
        await this.roleRepository.createOrUpdate(role);
    }

    async getFunctionsForRole(roleId: number): Promise<GetFunctionResponse[]> {
        const role = await this.roleRepository.getById(roleId, ['functions']);
        if (!role) {
            throw new RoleException('Role not found', 404);
        }
        return role.functions;
    }
}