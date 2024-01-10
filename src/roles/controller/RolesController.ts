import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { RoleService } from "../service/RoleService";
import { CreateRoleRequest } from "../dto/request/CreateRoleRequest";
import { UpdateRoleRequest } from "../dto/request/UpdateRoleRequest";
import { GetRoleResponse } from "../dto/response/GetRoleResponse";
import { RoleResponse } from "../dto/response/RoleResponse";
import { AssignFunctionsToRoleRequest } from "../dto/request/AssignFunctionsToRoleRequest";
import { Function } from "../../functions/model/Function.entity";
import { AuthGuard } from "src/auth/utils/AuthGuard";

@UseGuards(AuthGuard)
@Controller('api/roles')
export class RolesController {

  public constructor(
    private readonly roleService: RoleService,
  ) { }

  @Get()
  getAll(): Promise<GetRoleResponse[]> {
    return this.roleService.findAll();
  }

  @Get('/:id')
  async get(@Param('id') id: any): Promise<GetRoleResponse> {
    id = parseInt(id) || -1;
    return await this.roleService.findOne(id);
  }

  @Get('/:id/functions')
  async getFunctions(@Param('id') id: any): Promise<Function[]> {
    id = parseInt(id) || -1;
    return await this.roleService.getFunctionsForRole(id);
  }

  @Post()
  async create(@Body() role: CreateRoleRequest): Promise<RoleResponse> {
    const roleId = await this.roleService.create(role);
    return {
      message: "Role created successfully",
      id: roleId
    }
  }

  @Post('/:id/functions')
  async assignFunctions(@Param('id') id: any, @Body() request: AssignFunctionsToRoleRequest): Promise<RoleResponse> {
    id = parseInt(id) || -1;
    request.roleId = id;
    await this.roleService.assignFunctions(request);
    return {
      message: "Functions assigned successfully",
      id: id
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: any): Promise<RoleResponse> {
    id = parseInt(id) || -1;
    await this.roleService.delete(id);
    return {
      message: "Role deleted successfully",
      id: id
    }
  }

  @Put('/:id')
  async update(@Param('id') id: any, @Body() role: UpdateRoleRequest): Promise<RoleResponse> {
    id = parseInt(id) || -1;
    await this.roleService.update(id, role);
    return {
      message: "Role updated successfully",
      id: id
    }
  }
}