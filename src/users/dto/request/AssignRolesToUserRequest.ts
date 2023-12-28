import { IsInt, IsNotEmpty, IsArray } from 'class-validator';

export class AssignRolesToUserRequest {

    userId: number;

    @IsArray()
    @IsInt({ each: true })
    roleIds: number[];
}