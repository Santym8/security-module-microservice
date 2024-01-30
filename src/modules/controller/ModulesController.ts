import { Controller, Body, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ModulesService } from '../service/ModulesService.service';
import { CreateModuleRequest } from '../dto/request/CreateModuleRequest';
import { UpdateModelRequest } from '../dto/request/UpdateModuleRequest';
import { GetModuleResponse } from '../dto/response/GetModuleResponse';
import { ModelResponse } from '../dto/response/ModuleResponse';
import { AuthGuard } from 'src/auth/utils/AuthGuard';
import { FunctionRequired } from 'src/auth/utils/functions.decorator';
import { GetFunctionResponse } from 'src/functions/dto/response/GetFunctionResponse';

@UseGuards(AuthGuard)
@Controller('api/modules')
export class ModulesController {

    public constructor(
        private readonly moduleService: ModulesService,
    ) { }

    @Get()
    @FunctionRequired('SEC-MODULES-READ')
    getAll(): Promise<GetModuleResponse[]> {
        return this.moduleService.findAll();
    }

    @Get('/:id/functions')
    @FunctionRequired('SEC-MODULES-READ')
    async getFunctions(@Param('id') id: any): Promise<GetFunctionResponse[]> {
        id = parseInt(id) || -1;
        return await this.moduleService.getFunctionsForModule(id);
    }

    @Get('/:id')
    @FunctionRequired('SEC-MODULES-READ')
    async get(@Param('id') id: any): Promise<GetModuleResponse> {
        id = parseInt(id) || -1;
        return await this.moduleService.findOne(id);
    }

    @Post()
    @FunctionRequired('SEC-MODULES-CREATE')
    async create(@Body() module: CreateModuleRequest): Promise<ModelResponse> {
        const moduleId = await this.moduleService.create(module);
        return {
            message: "Module created successfully",
            id: moduleId
        }
    }

    @Delete('/:id')
    @FunctionRequired('SEC-MODULES-DELETE')
    async delete(@Param('id') id: any): Promise<ModelResponse> {
        id = parseInt(id) || -1;
        await this.moduleService.delete(id);
        return {
            message: "Module deleted successfully",
            id: id
        }
    }

    @Put('/:id')
    @FunctionRequired('SEC-MODULES-UPDATE')
    async update(@Param('id') id: any, @Body() module: UpdateModelRequest): Promise<ModelResponse> {
        id = parseInt(id) || -1;
        await this.moduleService.update(id, module);
        return {
            message: "Module updated successfully",
            id: id
        }
    }
}
