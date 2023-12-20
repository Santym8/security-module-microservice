import { User } from 'src/users/model/User.entity';
import { Module } from 'src/modules/Module.entity';

import { DataSource } from 'typeorm';
import { Function } from 'src/functions/Function.entity';
import { Role } from 'src/roles/Role.entity';
import { Audit } from 'src/audit/Audit.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: 'localhost',
        port: 1433,
        username: 'sa',
        password: 'Admin.1234',
        database: 'master',
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
  },
];