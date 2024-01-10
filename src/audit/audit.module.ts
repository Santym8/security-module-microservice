import { Module, forwardRef } from '@nestjs/common';
import { AuditController } from './controller/AuditController';
import { AuditRepository } from './repository/AuditRepository';
import { AuditService } from './service/AuditService';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { FunctionsModule } from 'src/functions/functions.module';

@Module({
    imports: [
        UsersModule,
        FunctionsModule,
        forwardRef(() => AuthModule)
    ], // Avoid circular dependency
    controllers: [AuditController],
    providers: [AuditRepository, AuditService],
    exports: [AuditRepository]
})
export class AuditModule { }
