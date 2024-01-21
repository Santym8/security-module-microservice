import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../model/User.entity';
import { ConfigService } from '@nestjs/config';
import { FunctionRepository } from 'src/functions/repository/FunctionRepository';

@Injectable()
export class UserRepository {

    private userRepository: Repository<User>;

    constructor(
        @Inject('DATA_SOURCE')
        private readonly dataSourceConfig: DataSource,
        private readonly configService: ConfigService,
        private readonly functionRepository: FunctionRepository
    ) {
        this.userRepository = this.dataSourceConfig.getRepository(User);
    }

    public async createOrUpdate(user: User): Promise<User> {
        return this.userRepository.save(user);
    }


    public async delete(id: number): Promise<void> {
        await this.userRepository.delete({ id: id });
    }


    public async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    public async getById(id: number, relations?: string[]): Promise<User> {
        if (relations) {
            return await this.userRepository.createQueryBuilder("user")
                .leftJoinAndSelect("user.roles", "role")
                .where("user.id = :id", { id })
                .getOne();
        }
        else {
            return await this.userRepository.findOneBy({ id: id });
        }
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


    public async getFunctionsOfUser(id: number): Promise<string[]> {
        const user = await this.userRepository.findOne(
            {
                where: { id: id },
                relations: ['roles.functions', 'roles.functions.module']
            });

        if (!user) {
            return [];
        }

        if (user.username === this.configService.get<string>("ADMIN_USERNAME")) {
            return (await this.functionRepository.getAll()).map(functions => functions.name);
        }

        return user.roles
            //Filter inactive roles
            .filter(role => role.status)
            // Arrays of functions that are active and their modules are active
            .map(role =>
                role.functions.filter(
                    functions => functions.status === true &&
                        functions.module.status === true
                ))
            // Concat arrays
            .reduce((acc, val) => acc.concat(val), [])
            // Get only the name of the functions
            .map(functions => functions.name)
            // Delete duplicates
            .filter((value, index, self) => self.indexOf(value) === index);
    }




}