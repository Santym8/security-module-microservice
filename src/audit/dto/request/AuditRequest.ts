import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AuditRequest {
    @IsNotEmpty()
    @IsString()
    functionId: string;

    @IsNotEmpty()
    @IsString()
    action: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    observation?: string;

    @IsNotEmpty()
    @IsString()
    ip: string;
}