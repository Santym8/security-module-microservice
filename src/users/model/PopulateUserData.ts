import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserRepository } from '../repository/UserRepository';
import { CreateUserRequest } from '../dto/request/CreateUserRequest';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PopulateUserData implements OnModuleInit {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly configService: ConfigService,
    ) { }

    async onModuleInit() {
        // Your data population logic goes here
        console.log('Populating User');
        await this.populateData();
    }

    private async populateData() {

        const users: CreateUserRequest[] = [
            {
                username: this.configService.get<string>("ADMIN_USERNAME") || "admin",
                email: this.configService.get<string>("ADMIN_USERNAME") || "admin@localhost",
                dni: this.configService.get<string>("ADMIN_DNI") || "12345678",
                password: this.configService.get<string>("ADMIN_PASSWORD") || "Admin.1234"
            },
        ]

        users.forEach(async (fun) => {
            const user = await this.userRepository.getByUsername(fun.username)
            if (user) return;

            await this.userRepository.createOrUpdate({
                id: null,
                username: fun.username,
                email: fun.email,
                dni: fun.dni,
                password: fun.password,
                status: true,
            });
        });
    }
}