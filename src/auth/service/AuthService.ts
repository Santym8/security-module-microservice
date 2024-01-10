import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/users/repository/UserRepository";
import { AuthException } from "../exception/AuthException";
import { TokenManager } from "../utils/TokenManager";
import { AuthReponse } from "../dto/response/AuthResponse";
import { Audit } from "src/audit/model/Audit.entity";
import { LoginRequest } from "../dto/request/LoginRequest";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly tokenManager: TokenManager
    ) { }

    async login(loginRequest: LoginRequest): Promise<AuthReponse> {
        const user = await this.userRepository.getByUsername(loginRequest.username)
            || await this.userRepository.getByEmail(loginRequest.username);

        if (!user) {
            throw new AuthException("User not found", 404);
        }


        if (user.password !== loginRequest.password) {
            throw new AuthException("Bad credentials", 401);
        }

        if (user.status === false) {
            throw new AuthException("User is inactive", 401);
        }

        const payload = {
            id: user.id,
        };

        const token = await this.tokenManager.newToken(payload);


        const functions = await this.userRepository.getFunctionsOfUser(user.id);
        return {
            token,
            username: user.username,
            email: user.email,
            functions: functions
        }
    }
}