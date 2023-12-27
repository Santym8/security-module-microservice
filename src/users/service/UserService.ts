import { Inject, Injectable } from '@nestjs/common';
import { User } from '../model/User.entity';
import { UserRepository } from '../repository/UserRepository';
import { CreateUserRequest } from '../dto/request/CreateUserRequest';
import { UserException } from '../exception/UserException';
import { UpdateUserRequest } from '../dto/request/UpdateUserRequest';
import { GetUserResponse } from '../dto/response/GetUserResponse';


@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    async findAll(): Promise<GetUserResponse[]> {
        return await this.userRepository.getAll();
    }

    async findOne(id: number): Promise<GetUserResponse> {
        const user = await this.userRepository.getById(id);

        if (!user) {
            throw new UserException('User not found', 404);
        }

        return user;
    }

    async create(user: CreateUserRequest): Promise<number> {
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
            id: null,
        }

        const userCreated = await this.userRepository.createOrUpdate(newUser);
        return userCreated.id;
    }

    async delete(id: number): Promise<void> {
        if (!await this.userRepository.getById(id)) {
            throw new UserException('User not found', 404);
        }

        await this.userRepository.delete(id).catch((err) => {
            throw new UserException('User has associated data', 400);
        });
    }

    async update(id: number, user: UpdateUserRequest): Promise<void> {
        const userToUpdate = await this.userRepository.getById(id);
        if (!userToUpdate) {
            throw new UserException('User not found', 404);
        }

        let userAlreadyExists = await this.userRepository.getByEmail(user.email);
        if (userAlreadyExists && userAlreadyExists.id != userToUpdate.id) {
            throw new UserException('User with that email already exists', 400);
        }

        userAlreadyExists = await this.userRepository.getByDni(user.dni);
        if (userAlreadyExists && userAlreadyExists.id != userToUpdate.id) {
            throw new UserException('User with that dni already exists', 400);
        }

        userAlreadyExists = await this.userRepository.getByUsername(user.username);
        if (userAlreadyExists && userAlreadyExists.id != userToUpdate.id) {
            throw new UserException('User with that username already exists', 400);
        }

        userToUpdate.username = user.username;
        userToUpdate.email = user.email;
        userToUpdate.dni = user.dni;
        userToUpdate.status = user.status;
        userToUpdate.password = user.password;


        await this.userRepository.createOrUpdate(userToUpdate);
    }
}