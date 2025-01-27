import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'datetime' })
  deadline: Date;

  @Column({ default: 'todo', enum: ['todo', 'progress', 'complete'] })
  status: string;

  @Column({ nullable: true })
  projectId: number;

  @Column('simple-array')
  assignedUserIds: number[];

  @Column('simple-array')
  assignedTeamIds: number[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
