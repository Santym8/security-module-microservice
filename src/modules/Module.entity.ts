import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { Function } from "../functions/Function.entity";

@Entity({ name: 'sec_module' })
export class Module {
    @PrimaryColumn({ length: 15, type: 'varchar' })
    id: string;

    @Column({ nullable: false, length: 50, type: 'varchar' })
    name: string;

    @Column({ nullable: false, length: 50, type: 'varchar' })
    description: string;

    @Column({ default: true, type: 'bit', nullable: false })
    status: boolean;

    @OneToMany(type => Function, func => func.module)
    functions: Function[];

}