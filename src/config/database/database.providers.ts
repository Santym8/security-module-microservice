import { User } from 'src/users/model/User.entity';
import { Module } from 'src/modules/model/Module.entity';

import { DataSource } from 'typeorm';
import { Function } from 'src/functions/model/Function.entity';
import { Role } from 'src/roles/model/Role.entity';
import { Audit } from 'src/audit/model/Audit.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    imports: [ConfigModule],
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: configService.get<string>("DB_HOST") || 'localhost',
        port: parseInt(configService.get("DB_PORT")) || 1433,
        username: configService.get<string>("DB_USERNAME") || 'sa',
        password: configService.get<string>("DB_PASSWORD") || 'Admin.1234',
        database: configService.get<string>("DB_DATABASE") || 'master',
        entities: [
          User, Module, Function, Role, Audit
        ],
        synchronize: true,
        extra: {
          trustServerCertificate: true
        }
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];