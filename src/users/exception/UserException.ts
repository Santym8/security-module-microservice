import { HttpException } from "@nestjs/common";

export class UserException extends HttpException {
    constructor(message, status) {
        super(message, status);
    }
}   