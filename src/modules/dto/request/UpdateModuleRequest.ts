import { IsNotEmpty, IsString, Length, IsBoolean} from 'class-validator';

export class UpdateModelRequest {
    @IsString()
    @IsNotEmpty()
    @Length(5, 50)
    name: string;

    @IsString()
    @IsNotEmpty()
    @Length(5, 50)
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}