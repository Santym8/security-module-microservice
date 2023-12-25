import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database/database.module';
import { AuditController } from './controller/AuditController';
import { AuditRepository } from './repository/AuditRepository';
import { AuditService } from './service/AuditService';
import { UserRepository } from 'src/users/repository/UserRepository';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [DatabaseModule, UsersModule, AuthModule],
    controllers: [AuditController],
    providers: [AuditRepository, AuditService],
})
export class AuditModule { }
