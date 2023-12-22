import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomErrorResponse } from './CustomErrorResponse';
import { ValidationException } from './ValidationException';

@Catch(HttpException)
export class ExceptionHandler implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        if (exception instanceof ValidationException) {
            return response
                .status(exception.getStatus())
                .send(CustomErrorResponse.fromValidationException(exception, request.path))
        }


        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            return response
                .status(status)
                .send(CustomErrorResponse.fromHttpException(exception, request.path))
        }


        return response
            .status(500)
            .send(CustomErrorResponse.fromError(exception, request.path))


    }
}