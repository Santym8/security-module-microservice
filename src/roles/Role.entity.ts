import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from "typeorm"
import { Function } from "../functions/Function.entity";
import { User } from "../users/User.entity";

@Entity({ name: 'sec_role' })
export class Role {
    @PrimaryColumn({ nullable: false, length: 20, type: 'varchar' })
    name: string;

    @Column({ default: true, type: 'bit', nullable: false })
    status: boolean;

    @ManyToMany(type => Function, func => func.roles)
    @JoinTable()
    functions: Function[];

    @ManyToMany(type => User, user => user.roles)
    users: User[];

}