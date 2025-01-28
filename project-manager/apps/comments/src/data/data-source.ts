import { join } from 'path';
import { DataSource } from 'typeorm';
import { Comment } from '../entities/comment.entity';

const CommentsDataSource = new DataSource({
  type: 'sqlite',
  database: join(__dirname, '/comments.sqlite'),
  entities: [Comment],
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],
  synchronize: true,
  logging: true,
});

export default CommentsDataSource;
