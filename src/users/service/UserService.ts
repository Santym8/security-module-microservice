import { Inject, Injectable } from '@nestjs/common';
import { User } from '../model/User.entity';
import { UserRepository } from '../repository/UserRepository';
import { UserDto } from '../dto/UserDto';
import { UserException } from '../exception/UserException';


@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    async findAll(): Promise<UserDto[]> {
        return await this.userRepository.getAll();
    }

    async create(user: UserDto): Promise<UserDto> {
        if (await this.userRepository.getByEmail(user.email)) {
            throw new UserException('User with that email already exists', 400);
        }

        if (await this.userRepository.getByDni(user.dni)) {
            throw new UserException('User with that dni already exists', 400);
        }

        if (await this.userRepository.getByUsername(user.username)) {
            throw new UserException('User with that username already exists', 400);
        }

        const newUser: User = {
            ...user,
            status: true,
        }

        return await this.userRepository.create(newUser);
    }



}