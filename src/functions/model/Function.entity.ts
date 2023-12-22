import { Entity, Column, PrimaryColumn, ManyToOne, ManyToMany } from "typeorm"
import { Module } from "../../modules/model/Module.entity";
import { Role } from "../../roles/model/Role.entity";

@Entity({ name: 'sec_function' })
export class Function {
    @PrimaryColumn({ length: 25, type: 'varchar' })
    id: string;

    @Column({ length: 50, type: 'varchar', nullable: false })
    name: string;

    @Column({ default: true, type: 'bit', nullable: false })
    status: boolean;

    @ManyToOne(type => Module, module => module.functions)
    module: Module;

    @ManyToMany(type => Role, role => role.functions)
    roles: Role[];
}