import { join } from 'path';
import { DataSource } from 'typeorm';
import { Task } from '../entities/task.entity';

const TaskDataSource = new DataSource({
  type: 'sqlite',
  database: join(__dirname, 'data/users.sqlite'),
  entities: [Task],
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],
  synchronize: true,
  logging: true,
});
