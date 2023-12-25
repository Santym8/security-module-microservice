import { HttpException } from "@nestjs/common";

export class AuthException extends HttpException {
    constructor(mesagge: string, statusCode: number) {
        super(mesagge, statusCode);
    }
}