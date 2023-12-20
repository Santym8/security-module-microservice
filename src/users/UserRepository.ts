import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './User.entity';

@Injectable()
export class UserRepository {

    private userRepository: Repository<User>;

    constructor(
        @Inject('DATA_SOURCE')
        private readonly dataSourceConfig: DataSource,
    ) {
        this.userRepository = this.dataSourceConfig.getRepository(User);
    }

    public async create(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    public async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    public async getByUsername(username: string): Promise<User> {
        return await this.userRepository.findOneBy({ username: username });
    }

    public async getByEmail(email: string): Promise<User> {
        return await this.userRepository.findOneBy({ email: email });
    }

    public async getByDni(dni: string): Promise<User> {
        return await this.userRepository.findOneBy({ dni: dni });
    }


}