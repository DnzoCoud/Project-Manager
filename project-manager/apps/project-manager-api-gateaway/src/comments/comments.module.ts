import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { AuthenticationModule } from '../authentication/authentication.module';
import { MICROSERVICE_PORTS } from '@app/contracts/microservices-ports';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMENTS_CLIENT',
        transport: Transport.TCP,
        options: {
          port: MICROSERVICE_PORTS.COMMENTS_MICROSERVICE,
        },
      },
    ]),
    AuthenticationModule,
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
