import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenManager } from './TokenManager';
import { Payload } from './interfaces/Payload';
import { Reflector } from '@nestjs/core';
import { UserRepository } from 'src/users/repository/UserRepository';
import { FunctionRequired } from './functions.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly tokenManager: TokenManager,
        private readonly reflector: Reflector,
        private readonly userRepository: UserRepository,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload: Payload = await this.tokenManager.verifyToken(token);
            request.headers.user = payload;
            const user = await this.userRepository.getById(payload.id);
            if (!user) {
                throw new UnauthorizedException();
            }
        } catch {
            throw new UnauthorizedException();
        }


        const requiredFunction = this.reflector.get<string>(FunctionRequired, context.getHandler());

        if (!requiredFunction) {
            return true;
        }

        const userFunctions = await this.userRepository.getFunctionsOfUser(request.headers.user.id);

        if (!userFunctions) {
            throw new UnauthorizedException();
        }

        if (!userFunctions.includes(requiredFunction)) {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}