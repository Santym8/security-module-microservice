import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/users/repository/UserRepository";
import { AuthException } from "../exception/AuthException";
import { TokenManager } from "../utils/TokenManager";
import { AuthReponse } from "../dto/response/AuthResponse";
import { AuditRepository } from "src/audit/repository/AuditRepository";
import { Audit } from "src/audit/model/Audit.entity";
import { LoginRequest } from "../dto/request/LoginRequest";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly tokenManager: TokenManager,
        private readonly auditRepository: AuditRepository
    ) { }

    async login(loginRequest: LoginRequest): Promise<AuthReponse> {
        const user = await this.userRepository.getByUsername(loginRequest.username)
            || await this.userRepository.getByEmail(loginRequest.username);

        if (!user) {
            throw new AuthException("User not found", 404);
        }

        const audit: Audit = {
            action: 'LOGIN',
            description: 'Login failed',
            ip: loginRequest.ip,
            date: new Date(),
            user: user,
        }

        if (user.password !== loginRequest.password) {
            await this.auditRepository.createOrUpdate(audit);
            throw new AuthException("Unauthorized", 401);
        }

        const payload = {
            id: user.id,
        };

        const token = await this.tokenManager.newToken(payload);

        audit.description = 'Login success';
        await this.auditRepository.createOrUpdate(audit);

        const functions = await this.userRepository.getFunctionsOfUser(user.id);
        return {
            token,
            username: user.username,
            email: user.email,
            functions: functions
        }
    }
}