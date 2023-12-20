import { HttpException } from "@nestjs/common";

export class UserException extends HttpException {
    constructor(message, statusCode) {
        super(message, statusCode);
    }
}