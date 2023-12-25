import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuditModule } from './audit/audit.module';
import { FunctionsModule } from './functions/functions.module';
import { ModulesModule } from './modules/modules.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuditModule,
    FunctionsModule,
    ModulesModule,
    RolesModule,
    AuthModule
  ],
})
export class AppModule { }
