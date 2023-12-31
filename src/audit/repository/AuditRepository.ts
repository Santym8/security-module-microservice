import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Audit } from '../model/Audit.entity';

@Injectable()
export class AuditRepository {

    private auditRepository: Repository<Audit>;

    constructor(
        @Inject('DATA_SOURCE')
        private readonly dataSourceConfig: DataSource,
    ) {
        this.auditRepository = this.dataSourceConfig.getRepository(Audit);
    }

    public async createOrUpdate(audit: Audit): Promise<Audit> {
        return this.auditRepository.save(audit);
    }


    public async delete(id: number): Promise<void> {
        await this.auditRepository.delete({ id: id });
    }


    public async getAllJoinUserAndFunction(): Promise<Audit[]> {
        return (await this.auditRepository.find({
            relations: ['user', 'function'],
            order: {
                id: "DESC"
            }
        }));
    }
}