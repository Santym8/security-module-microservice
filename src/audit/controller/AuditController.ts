import { Body, Controller, Get, Headers, Param, Post, UseGuards } from '@nestjs/common';
import { AuditService } from '../service/AuditService';
import { AuditResponse } from '../dto/response/AuditResponse';
import { AuditRequest } from '../dto/request/AuditRequest';
import { CreateAuditResponse } from '../dto/response/CreateAuditResponse';
import { AuthGuard } from 'src/auth/utils/AuthGuard';
import { FunctionRequired } from 'src/auth/utils/functions.decorator';

@UseGuards(AuthGuard)
@Controller('api/audit')
export class AuditController {

    public constructor(
        private readonly auditService: AuditService,
    ) { }

    @Get()
    @FunctionRequired('SEC-AUDIT-READ')
    getAll(): Promise<AuditResponse[]> {
        return this.auditService.findAll();
    }

    @Post()
    async create(@Headers() headers: any, @Body() audit: AuditRequest): Promise<CreateAuditResponse> {
        const userId = headers.user.id || -1;

        const auditId = await this.auditService.create(audit, userId);
        return {
            message: "Audit created successfully",
            id: auditId
        }
    }

    @Get("/user/:id")
    @FunctionRequired('SEC-AUDIT-READ')
    async getAuditByUser(@Param('id') id: any): Promise<AuditResponse[]> {
        id = parseInt(id) || -1;
        return await this.auditService.findAllByUser(id);

    }

}