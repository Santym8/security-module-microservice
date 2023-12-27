import { GetModuleResponse } from "src/modules/dto/response/GetModuleResponse";

export class GetFunctionResponse {
    id: number;
    name: string;
    status: boolean;
    module: GetModuleResponse;
}