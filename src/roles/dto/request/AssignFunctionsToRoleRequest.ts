// AssignFunctionsToRoleRequest.ts
import { IsInt, IsNotEmpty, IsArray } from 'class-validator';

export class AssignFunctionsToRoleRequest {

    roleId: number;

    @IsArray()
    @IsInt({ each: true })
    @IsNotEmpty()
    functionIds: number[];
}