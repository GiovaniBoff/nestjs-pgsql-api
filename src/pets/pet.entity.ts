import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pet extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;
}
