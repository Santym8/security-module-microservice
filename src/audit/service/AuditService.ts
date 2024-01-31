import { Injectable } from '@nestjs/common';
import { AuditRepository } from '../repository/AuditRepository';
import { AuditResponse } from '../dto/response/AuditResponse';
import { AuditRequest } from '../dto/request/AuditRequest';
import { Audit } from '../model/Audit.entity';
import { UserRepository } from 'src/users/repository/UserRepository';
import { UserException } from 'src/users/exception/UserException';
import { FunctionRepository } from 'src/functions/repository/FunctionRepository';
import { FuntionException } from 'src/functions/exception/FuntionException';


@Injectable()
export class AuditService {
    constructor(
        private readonly auditRepository: AuditRepository,
        private readonly userRepository: UserRepository,
        private readonly functionRepository: FunctionRepository,
    ) { }

    async findOne(id: number): Promise<AuditResponse> {
        const audit = await this.auditRepository.getByid(id);
    
        if (!audit) {
            throw new UserException('Audit not found', 404);
        }
    
        if (!audit.user) {
            throw new UserException('User not found for audit', 404);
        }
    
        const auditResponse = new AuditResponse();
        auditResponse.id = audit.id;
        auditResponse.action = audit.action;
        auditResponse.description = audit.description;
        auditResponse.observation = audit.observation;
        auditResponse.ip = audit.ip;
        auditResponse.date = audit.date;
        auditResponse.user = audit.user.email;
        auditResponse.functionName = audit.function?.name;
    
        return auditResponse;
    }

    async findAll(): Promise<AuditResponse[]> {
        const audits = await this.auditRepository.getAllJoinUserAndFunction();

        return audits.map(audit => {
            const auditResponse = new AuditResponse();
            auditResponse.id = audit.id;
            auditResponse.action = audit.action;
            auditResponse.description = audit.description;
            auditResponse.observation = audit.observation;
            auditResponse.ip = audit.ip;
            auditResponse.date = audit.date;
            auditResponse.user = audit.user.email;
            auditResponse.functionName = audit.function?.name;
            return auditResponse;
        });
    }

    async findAllByUser(userId: number, skip: number, take: number): Promise<AuditResponse[]> {

        const user = await this.userRepository.getById(userId);

        if (!user) {
            throw new UserException('User not found', 404);
        }

        const audits = await this.auditRepository.getAllJoinUserAndFunctionByUser(userId, skip, take);

        return audits.map(audit => {
            const auditResponse = new AuditResponse();
            auditResponse.id = audit.id;
            auditResponse.action = audit.action;
            auditResponse.description = audit.description;
            auditResponse.observation = audit.observation;
            auditResponse.ip = audit.ip;
            auditResponse.date = audit.date;
            auditResponse.user = audit.user.email;
            auditResponse.functionName = audit.function?.name;
            return auditResponse;
        });
    }

    async create(audit: AuditRequest, userId: number): Promise<number> {

        const user = await this.userRepository.getById(userId);

        if (!user) {
            throw new UserException('User not found', 404);
        }

        const functionEntity = await this.functionRepository.getByName(audit.functionName);

        if (!functionEntity) {
            throw new FuntionException('Function not found', 404);
        }

        const auditEntity: Audit = {
            ...audit,
            date: new Date(),
            user: user,
            function: functionEntity,
        }

        const auditCreated = await this.auditRepository.createOrUpdate(auditEntity);

        return auditCreated.id;
    }


}