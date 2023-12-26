import { IsString, Length, IsNotEmpty } from 'class-validator';
export class CreateRoleRequest {
    @IsString()
    @IsNotEmpty()
    @Length(5, 50)
    name: string;
}