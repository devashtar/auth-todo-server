import { Entity, Column, PrimaryGeneratedColumn,  } from "typeorm";
// import { Token } from './Token';
// import { Task } from "./Task";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        unique: false
    })
    email!: string;

    @Column({
        nullable: false
    })
    password!: string;

    @Column({
        default: 'user',   // user | admin
        nullable: false
    })
    role!: string;

}