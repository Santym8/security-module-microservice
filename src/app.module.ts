import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuditModule } from './audit/audit.module';
import { FunctionsModule } from './functions/functions.module';
import { ModulesModule } from './modules/modules.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PopulateDataModule } from './config/populate-data/populate-data.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuditModule,
    ModulesModule,
    FunctionsModule,
    RolesModule,
    AuthModule,
    PopulateDataModule,
    TestModule
  ],
})
export class AppModule { }
