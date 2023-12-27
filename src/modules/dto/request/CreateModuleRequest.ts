import {IsString, Length, IsNotEmpty} from 'class-validator';

export class CreateModuleRequest {
    @IsString()
    @IsNotEmpty()
    @Length(5, 50)
    name: string;

    @IsString()
    @IsNotEmpty()
    @Length(5, 50)
    description: string;
}
