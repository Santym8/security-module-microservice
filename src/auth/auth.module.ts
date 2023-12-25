import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './utils/constants';
import { AuthService } from './service/AuthService';
import { AuthController } from './controller/AuthController';
import { TokenManager } from './utils/TokenManager';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [AuthService, TokenManager],
    controllers: [AuthController],
    exports: [],
})
export class AuthModule { }
