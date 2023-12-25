import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenManager {

    constructor(private readonly jwtService: JwtService) { }

    // public verifyToken(token: string): string {

    // }

    public async newToken(payload: any): Promise<string> {
        return await this.jwtService.signAsync(payload);
    }

}