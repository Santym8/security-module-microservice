import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuditModule } from './audit/audit.module';
import { FunctionsModule } from './functions/functions.module';
import { ModulesModule } from './modules/modules.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [UsersModule, AuditModule, FunctionsModule, ModulesModule, RolesModule],
})
export class AppModule { }
