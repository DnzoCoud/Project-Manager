import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { join } from 'path';

const UserDataSource = new DataSource({
  type: 'sqlite',
  database: join(__dirname, 'data/users.sqlite'),
  entities: [User, Role],
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],
  synchronize: true,
  logging: true,
});

export default UserDataSource;
