import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database/database.module';

@Module({
    imports: [DatabaseModule]
})
export class FunctionsModule { }
