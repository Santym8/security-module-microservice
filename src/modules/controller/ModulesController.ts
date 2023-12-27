import { Controller, Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ModulesService } from '../service/ModulesService.service';
import { CreateModuleRequest } from '../dto/request/CreateModuleRequest';
import { UpdateModelRequest } from '../dto/request/UpdateModuleRequest';
import { GetModuleResponse } from '../dto/response/GetModuleResponse';
import { ModelResponse } from '../dto/response/ModuleResponse';

@Controller('api/modules')
export class ModulesController {

    public constructor(
        private readonly moduleService: ModulesService,
    ) { }

    @Get()
    getAll(): Promise<GetModuleResponse[]> {
        return this.moduleService.findAll();
    }

    @Get('/:id')
    async get(@Param('id') id: any): Promise<GetModuleResponse> {
        id = parseInt(id) || -1;
        return await this.moduleService.findOne(id);
    }

    @Post()
    async create(@Body() module: CreateModuleRequest): Promise<ModelResponse> {
        const moduleId = await this.moduleService.create(module);
        return {
            message: "Module created successfully",
            id: moduleId
        }
    }

    @Delete('/:id')
    async delete(@Param('id') id: any): Promise<ModelResponse> {
        id = parseInt(id) || -1;
        await this.moduleService.delete(id);
        return {
            message: "Module deleted successfully",
            id: id
        }
    }

    @Put('/:id')
    async update(@Param('id') id: any, @Body() module: UpdateModelRequest): Promise<ModelResponse> {
        id = parseInt(id) || -1;
        await this.moduleService.update(id, module);
        return {
            message: "Module updated successfully",
            id: id
        }
    }
}
