import { Global, Module, forwardRef } from '@nestjs/common';
import { AuditController } from './controller/AuditController';
import { AuditRepository } from './repository/AuditRepository';
import { AuditService } from './service/AuditService';
import { UsersModule } from 'src/users/users.module';
import { FunctionsModule } from 'src/functions/functions.module';

@Global()
@Module({
    imports: [
        UsersModule,
        FunctionsModule,
    ],
    controllers: [AuditController],
    providers: [AuditRepository, AuditService],
    exports: [AuditRepository]
})
export class AuditModule { }
