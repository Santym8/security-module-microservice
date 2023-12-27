import { IsString, IsNotEmpty, Length, IsInt } from "class-validator";

export class CreateFunctionRequest {
    @IsString()
    @IsNotEmpty()
    @Length(5, 50)
    name: string;

    @IsInt()
    @IsNotEmpty()
    moduleId: number;
}