import { Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Module } from "../../modules/model/Module.entity";
import { Role } from "../../roles/model/Role.entity";

@Entity({ name: 'sec_function' })
export class Function {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, type: 'varchar', nullable: false, unique: true })
    name: string;

    @Column({ default: true, type: 'bit', nullable: false })
    status: boolean;

    @ManyToOne(type => Module, module => module.functions)
    module: Module;

    @ManyToMany(type => Role, role => role.functions)
    roles?: Role[];
}