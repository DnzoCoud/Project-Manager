import { join } from 'path';
import { DataSource } from 'typeorm';
import { Project } from '../entities/project.entity';

const ProjectDataSource = new DataSource({
  type: 'sqlite',
  database: join(__dirname, 'data/projects.sqlite'),
  entities: [Project],
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],
  synchronize: true,
  logging: true,
});

export default ProjectDataSource;
