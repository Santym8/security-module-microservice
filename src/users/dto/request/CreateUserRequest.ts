import { IsString, IsEmail, Length, IsNotEmpty } from 'class-validator';
export class CreateUserRequest {
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
}