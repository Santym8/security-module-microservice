import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from "typeorm"
import { Module } from "../modules/Module.entity";
import { Role } from "../roles/Role.entity";

@Entity({ name: 'sec_function' })
export class Function {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 50, type: 'varchar' })
    name: string;

    @Column({ default: true, type: 'bit', nullable: false })
    status: boolean;

    @ManyToOne(type => Module, module => module.functions)
    module: Module;

    @ManyToMany(type => Role, role => role.functions)
    roles: Role[];
}