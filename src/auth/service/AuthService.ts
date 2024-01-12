import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/users/repository/UserRepository";
import { AuthException } from "../exception/AuthException";
import { TokenManager } from "../utils/TokenManager";
import { AuthReponse } from "../dto/response/AuthResponse";
import { LoginRequest } from "../dto/request/LoginRequest";
import { Payload } from "../utils/interfaces/Payload";
import { User } from "src/users/model/User.entity";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly tokenManager: TokenManager,
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) { }

    async login(loginRequest: LoginRequest): Promise<AuthReponse> {
        const user = await this.userRepository.getByUsername(loginRequest.username)
            || await this.userRepository.getByEmail(loginRequest.username);

        if (!user) {
            throw new AuthException("User not found", 404);
        }

        const hasValidCredentials = await this.validateCredentials(
            user, loginRequest.password
        );

        if (!hasValidCredentials) {
            throw new AuthException("Bad credentials", 401);
        }

        if (user.status === false) {
            throw new AuthException("User is inactive", 401);
        }

        const payload: Payload = {
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


    async validateCredentials(user: User, password: string): Promise<boolean> {
        if (user.username === this.configService.get<string>('ADMIN_USERNAME')) {
            return password === this.configService.get<string>('ADMIN_PASSWORD');
        }

        const host = this.configService.get<string>('MICROSOFT_URL');

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        const body =
            "client_id=" + this.configService.get<string>('MICROSOFT_CLIENT_ID') +
            "&client_secret=" + this.configService.get<string>('MICROSOFT_CLIENT_SECRET') +
            "&scope=User.Read%20profile%20openid%20email" +
            "&username=" + user.email +
            "&password=" + password +
            "&grant_type=password";


        const validErrors = [65001, 50076]

        try {
            const { data } = await firstValueFrom(this.httpService.post(host, body, config));
            if (data.access_token) {
                return true;
            }
        } catch (err) {
            if (validErrors.includes(err.response.data.error_codes[0])) {
                return true;
            }
            const errorCodes = err.response.data.error_codes;
            const errorMesaje = "Bad credentials, Error code: " + errorCodes;
            throw new AuthException(errorMesaje, 401);
        }

    }
}