import { Body, Controller, Get, Headers, Post, UseGuards } from '@nestjs/common';
import { AuditService } from '../service/AuditService';
import { AuditResponse } from '../dto/response/AuditResponse';
import { AuditRequest } from '../dto/request/AuditRequest';
import { CreateAuditResponse } from '../dto/response/CreateAuditResponse';
import { AuthGuard } from 'src/auth/utils/AuthGuard';

@UseGuards(AuthGuard)
@Controller('api/audit')
export class AuditController {

    public constructor(
        private readonly auditService: AuditService,
    ) { }

    @Get()
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
}