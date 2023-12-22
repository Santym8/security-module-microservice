import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Function } from "../../functions/model/Function.entity";

@Entity({ name: 'sec_module' })
export class Module {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 50, type: 'varchar', unique: true })
    name: string;

    @Column({ nullable: false, length: 50, type: 'varchar' })
    description: string;

    @Column({ default: true, type: 'bit', nullable: false })
    status: boolean;

    @OneToMany(type => Function, func => func.module)
    functions: Function[];

}