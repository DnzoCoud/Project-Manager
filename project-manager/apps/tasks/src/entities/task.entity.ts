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

  @Column({ type: 'timestamp' })
  deadline: Date;

  @Column({ default: 'todo', enum: ['todo', 'progress', 'complete'] })
  status: string;

  @Column({ nullable: true })
  projectId: number;

  @Column({ nullable: true })
  assignedUserId: number;

  @Column({ nullable: true })
  assignedTeamId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
