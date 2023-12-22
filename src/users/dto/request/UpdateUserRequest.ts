import { IsString, IsEmail, Length, IsNotEmpty, IsBoolean } from 'class-validator';
export class UpdateUserRequest {
    @IsString()
    @IsNotEmpty()
    @Length(5, 20)
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(10, 15)
    dni: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 15)
    password: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;

}