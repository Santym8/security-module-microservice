import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../users/repository/UserRepository';
import { CreateUserRequest } from '../../users/dto/request/CreateUserRequest';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PopulateUserData {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly configService: ConfigService,
    ) { }

    public async populateData() {
        console.log('Populating users...')
        const users: CreateUserRequest[] = [
            {
                username: this.configService.get<string>("ADMIN_USERNAME") || "admin",
                email: this.configService.get<string>("ADMIN_USERNAME") || "admin@localhost",
                dni: this.configService.get<string>("ADMIN_DNI") || "12345678",
                password: this.configService.get<string>("ADMIN_PASSWORD") || "Admin.1234"
            },
        ]

        await Promise.all(users.map(async (fun) => {
            const user = await this.userRepository.getByUsername(fun.username)

            if (user) {
                console.log(`User ${fun.username} already exists`)
                return;
            }

            await this.userRepository.createOrUpdate({
                id: null,
                username: fun.username,
                email: fun.email,
                dni: fun.dni,
                password: fun.password,
                status: true,
            });
        }));
    }
}