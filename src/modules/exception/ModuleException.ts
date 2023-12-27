import {HttpException} from '@nestjs/common'

export class ModuleException extends HttpException{
    constructor(message, statusCode){
        super(message, statusCode);
    }
}
