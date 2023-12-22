import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm"
import { Function } from "../../functions/model/Function.entity";
import { User } from "../../users/model/User.entity";

@Entity({ name: 'sec_role' })
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25, type: 'varchar', nullable: false, unique: true })
    name: string;

    @Column({ default: true, type: 'bit', nullable: false })
    status: boolean;

    @ManyToMany(type => Function, func => func.roles)
    @JoinTable()
    functions: Function[];

    @ManyToMany(type => User)
    users: User[];

}