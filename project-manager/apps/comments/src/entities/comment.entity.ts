import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskId: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  parentCommentId: number;

  @Column({ type: 'text' })
  comment: string;

  @CreateDateColumn()
  created_at: Date;
}
