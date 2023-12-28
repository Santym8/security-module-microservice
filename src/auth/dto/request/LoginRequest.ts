import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginRequest {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(7, 15)
    ip:string;
}