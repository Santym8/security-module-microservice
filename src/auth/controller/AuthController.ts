import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../service/AuthService";
import { LoginRequest } from "../dto/request/LoginRequest";
import { AuthReponse } from "../dto/response/AuthResponse";

@Controller('api/auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post()
    async login(@Body() request: LoginRequest): Promise<AuthReponse> {
        return await this.authService.login(request.username, request.password);
    }

}