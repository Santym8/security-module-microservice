import { Body, Controller, Get, Headers, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../service/AuthService";
import { LoginRequest } from "../dto/request/LoginRequest";
import { AuthReponse } from "../dto/response/AuthResponse";
import { AuthGuard } from "../utils/AuthGuard";

@Controller('api/auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post()
    async login(@Body() request: LoginRequest): Promise<AuthReponse> {
        return await this.authService.login(request);
    }

    @UseGuards(AuthGuard)
    @Get()
    async verifyToken(): Promise<any> {
        return {
            message: 'Token is valid'
        }
    }

    @UseGuards(AuthGuard)
    @Get("functions")
    async getUserFunctions(@Headers() headers: any): Promise<any> {
        const userId = headers.user.id || -1;

        return this.authService.getUserFunctions(userId);
    }

}