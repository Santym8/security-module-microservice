import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/users/repository/UserRepository";
import { AuthException } from "../exception/AuthException";
import { TokenManager } from "../utils/TokenManager";
import { AuthReponse } from "../dto/response/AuthResponse";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly tokenManager: TokenManager
    ) { }

    async login(username: string, password: string): Promise<AuthReponse> {
        const user = await this.userRepository.getByUsername(username)
            || await this.userRepository.getByEmail(username);

        if (!user) {
            throw new AuthException("User not found", 404);
        }

        if (user.password !== password) {
            throw new AuthException("Unauthorized", 401);
        }

        const payload = {
            username: user.username,
            email: user.email,
        };

        const token = await this.tokenManager.newToken(payload);

        return {
            token,
            username: user.username,
            email: user.email,
        }
    }
}