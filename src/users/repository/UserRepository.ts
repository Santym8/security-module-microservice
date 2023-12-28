import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../model/User.entity';
import { Role } from 'src/roles/model/Role.entity';

@Injectable()
export class UserRepository {

    private userRepository: Repository<User>;

    constructor(
        @Inject('DATA_SOURCE')
        private readonly dataSourceConfig: DataSource,
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

    public async getById(id: number, relations?:string[]): Promise<User> {
        if(relations){
            return await this.userRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.roles", "role")
            .where("user.id = :id", { id })
            .getOne();
        }
        else{
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
                relations: ['roles.functions']
            });

        return user.roles
            // Arrays of functions
            .map(role => role.functions)
            // Concat arrays
            .reduce((acc, val) => acc.concat(val), [])
            // Get only the name of the functions
            .map(functions => functions.name)
            // Delete duplicates
            .filter((value, index, self) => self.indexOf(value) === index);
    }




}