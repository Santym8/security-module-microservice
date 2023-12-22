import { HttpException } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { ValidationException } from "./ValidationException";

export class CustomErrorResponse {
    error: string;
    message: any;
    statusCode: number;
    path: string;
    date: Date;

    constructor(error: string, message: any, statusCode: number, path: string, date: Date) {
        this.error = error;
        this.statusCode = statusCode;
        this.path = path;
        this.date = date;
        this.message = message;
    }


    public static fromError(error: Error, path: string): CustomErrorResponse {
        return new CustomErrorResponse(error.name, error.message, 500, path, new Date());
    }

    public static fromHttpException(error: HttpException, path: string): CustomErrorResponse {
        return new CustomErrorResponse(error.constructor.name, error.message, error.getStatus(), path, new Date());
    }

    public static fromValidationException(error: ValidationException, path: string): CustomErrorResponse {
        const details = error.details.map((error: ValidationError) => {
            return {
                field: error.property,
                errors: Object.values(error.constraints)
            }
        });
        return new CustomErrorResponse(
            error.constructor.name,
            details,
            error.getStatus(),
            path,
            new Date()
        );
    }
}