import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { join } from 'path';

export const UserDataSource = new DataSource({
  type: 'sqlite',
  database: join(__dirname, 'users.db'), // Ruta a la base de datos SQLite
  entities: [User, Role], // Las entidades que va a manejar
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')], // Las migraciones en src/migrations
  synchronize: false, // Evitar usar synchronize en producción
});
console.log(join(__dirname, '../migrations/*{.ts,.js}'));
