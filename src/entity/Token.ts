import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from './User';

@Entity()
export class Token {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        default: Date.now() // timestamp milleseconds
    })
    expires_on!: number;

    @Column({
        nullable: false
    })
    client_print_hash!: string;

    @ManyToOne(() => User, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    user_id!: string;

}