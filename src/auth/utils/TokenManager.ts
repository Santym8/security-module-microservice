import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenManager {

    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) { }

    public async verifyToken(token: string): Promise<any> {
        return await this.jwtService.verifyAsync(token, {
            secret: this.configService.get<string>('JWT_SECRET') || 'secret',

        });
    }

    public async newToken(payload: any): Promise<string> {
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_SECRET') || 'secret',
            expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') || '1d',
        });
    }

}