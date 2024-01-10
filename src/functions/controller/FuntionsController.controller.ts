import { Controller, Body, Delete, Param, Post, Get, Put, UseGuards } from '@nestjs/common';
import { FunctionsService } from '../service/FuntionsService.service';
import { CreateFunctionRequest } from '../dto/request/CreateFunctionRequest';
import { UpdateFunctionRequest } from '../dto/request/UpdateFunctionRequest';
import { GetFunctionResponse } from '../dto/response/GetFunctionResponse';
import { ModelResponse } from '../../modules/dto/response/ModuleResponse';
import { AuthGuard } from 'src/auth/utils/AuthGuard';

@UseGuards(AuthGuard)
@Controller('api/functions')
export class FunctionsController {

    public constructor(
        private readonly functionService: FunctionsService,
    ) { }

    @Get()
    getAll(): Promise<GetFunctionResponse[]> {
        return this.functionService.findAll();
    }

    @Get('/:id')
    async get(@Param('id') id: any): Promise<GetFunctionResponse> {
        id = parseInt(id) || -1;
        return await this.functionService.findOne(id);
    }

    @Post()
    async create(@Body() func: CreateFunctionRequest): Promise<ModelResponse> {
        const functionId = await this.functionService.create(func);
        return {
            message: "Function created successfully",
            id: functionId
        }
    }

    @Delete('/:id')
    async delete(@Param('id') id: any): Promise<ModelResponse> {
        id = parseInt(id) || -1;
        await this.functionService.delete(id);
        return {
            message: "Function deleted successfully",
            id: id
        }
    }

    @Put('/:id')
    async update(@Param('id') id: any, @Body() func: UpdateFunctionRequest): Promise<ModelResponse> {
        id = parseInt(id) || -1;
        await this.functionService.update(id, func);
        return {
            message: "Function updated successfully",
            id: id
        }
    }
}
