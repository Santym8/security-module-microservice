import { HttpException } from "@nestjs/common";

export class RoleException extends HttpException {
    constructor(message, statusCode) {
        super(message, statusCode);
    }
}