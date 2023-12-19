import { Inject, Injectable } from '@nestjs/common';
import { User } from './User.entity';
import { UserRepository } from './UserRepository';


@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    async findAll(): Promise<User[]> {
        return await this.userRepository.getAll();
    }

    async create(user: User): Promise<User> {
        return await this.userRepository.create(user);
    }

}