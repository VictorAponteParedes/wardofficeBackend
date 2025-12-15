import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Topic {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    tags: string;
}
