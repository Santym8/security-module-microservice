import { HttpException } from "@nestjs/common";
import { ValidationError } from "class-validator";

export class ValidationException extends HttpException {
    details: ValidationError[];
    constructor(details: ValidationError[]) {
        super('ValidationError', 400);
        this.details = details;
    }
}