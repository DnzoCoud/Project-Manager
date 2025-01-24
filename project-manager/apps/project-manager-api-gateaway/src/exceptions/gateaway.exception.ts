import { ArgumentsHost, Catch } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionFilter implements RpcExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const context = host.switchToRpc();
    const client = context.getContext();
    const response = exception.getError();

    client.emit('error', {
      status: 'error',
      message: response,
    });
  }
}
