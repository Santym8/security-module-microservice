import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/AuthService';
import { AuthController } from './controller/AuthController';
import { TokenManager } from './utils/TokenManager';
import { AuthGuard } from './utils/AuthGuard';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
    imports: [
        JwtModule.register({
            global: true,
        }),
        HttpModule
    ],
    providers: [AuthService, TokenManager, AuthGuard],
    controllers: [AuthController],
    exports: [TokenManager, AuthGuard],
})
export class AuthModule { }
