import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from './User';

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        nullable: false
    })
    title!: string;

    @Column({
        default: false
    })
    completed!: boolean;

    @ManyToOne(() => User, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    user_id?: string;

}