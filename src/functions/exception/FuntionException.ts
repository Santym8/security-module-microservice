import { HttpException } from '@nestjs/common'

export class FuntionException extends HttpException {
    constructor(message, statusCode) {
        super(message, statusCode);
    }
}
