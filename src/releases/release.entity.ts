import { User } from "src/users/user.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Release extends BaseEntity{ 

    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    description: string
    @Column()
    mounth: number
    @Column()
    year: number
    @Column()
    user: User
    @Column()
    value: number
    @Column()
    createdAt: Date
    @Column()
    type: string
    @Column()
    status:string
}