import { Function } from "src/functions/model/Function.entity";
import { User } from "src/users/model/User.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"

@Entity({ name: 'sec_audit' })
export class Audit {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: false, length: 30, type: 'varchar' })
    action: string;

    @Column({ nullable: false, type: 'text' })
    description: string;

    @Column({ nullable: true, type: 'text' })
    observation?: string;

    @Column({ nullable: false, length: 15, type: 'varchar' })
    ip: string;

    @Column({ nullable: false, type: 'datetime' })
    date: Date;

    @ManyToOne(type => User, { nullable: true })
    user?: User;

    @ManyToOne(type => Function, { nullable: true })
    function?: Function;
}