import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class AuditRequest {
    @IsNotEmpty()
    @IsString()
    functionName: string;

    @IsNotEmpty()
    @IsString()
    @Length(5, 30)
    action: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    observation?: string;

    @IsNotEmpty()
    @IsString()
    @Length(7, 15)
    ip: string;
}