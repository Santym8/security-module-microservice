import { Controller, Get } from '@nestjs/common';

@Controller()
export class TestController {
    
    @Get()
    getAll(): string {
        return "Hello From SECURITY MODULE";
    }

}