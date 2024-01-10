import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './service/AuthService';
import { AuthController } from './controller/AuthController';
import { TokenManager } from './utils/TokenManager';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
        }),
    ],
    providers: [AuthService, TokenManager],
    controllers: [AuthController],
    exports: [TokenManager],
})
export class AuthModule { }
