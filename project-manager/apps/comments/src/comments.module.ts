import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommentsDataSource from './data/data-source';
import { Comment } from './entities/comment.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICE_PORTS } from '@app/contracts/microservices-ports';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await CommentsDataSource.initialize();
        return CommentsDataSource.options;
      },
    }),
    TypeOrmModule.forFeature([Comment]),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP,
        options: {
          port: MICROSERVICE_PORTS.USERS_MICROSERVICE,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'TASKS_SERVICE',
        transport: Transport.TCP,
        options: {
          port: MICROSERVICE_PORTS.TASKS_MICROSERVICE,
        },
      },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
