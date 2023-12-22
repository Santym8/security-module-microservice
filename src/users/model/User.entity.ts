import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, OneToMany } from "typeorm"
import { Role } from "../../roles/model/Role.entity";
import { Audit } from "src/audit/model/Audit.entity";

@Entity({ name: 'sec_user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20, type: 'varchar', nullable: false, unique: true })
    username: string;

    @Column({ unique: true, nullable: false, length: 30, type: 'varchar' })
    email: string;

    @Column({ unique: true, nullable: false, length: 15, type: 'varchar' })
    dni: string;

    @Column({ default: true, type: 'bit', nullable: false })
    status: boolean;

    @Column({ nullable: false, length: 15, type: 'varchar' })
    password: string;
}