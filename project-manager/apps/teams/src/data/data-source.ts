import { join } from 'path';
import { DataSource } from 'typeorm';
import { Team } from '../entities/team.entity';

const TeamDataSource = new DataSource({
  type: 'sqlite',
  database: join(__dirname, '/teams.sqlite'),
  entities: [Team],
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],
  synchronize: true,
  logging: true,
});

export default TeamDataSource;
