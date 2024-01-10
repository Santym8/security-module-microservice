import { Module } from '@nestjs/common';
import { TestController } from './TestController.';

@Module({
    controllers: [TestController],
})
export class TestModule { }
