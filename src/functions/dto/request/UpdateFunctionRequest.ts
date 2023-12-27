import { IsNotEmpty, IsString, IsBoolean, Length, IsInt } from 'class-validator';

export class UpdateFunctionRequest {
    @IsString()
    @IsNotEmpty()
    @Length(5, 50)
    name: string;

    @IsInt()
    @IsNotEmpty()
    moduleId: number;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}