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
}