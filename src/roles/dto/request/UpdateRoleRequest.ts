import { IsString, Length, IsNotEmpty, IsBoolean } from 'class-validator';
export class UpdateRoleRequest {
    @IsString()
    @IsNotEmpty()
    @Length(5, 50)
    name: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}