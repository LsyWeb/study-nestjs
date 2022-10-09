import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';

export class HttpExecptionFilter implements ExceptionFilter {
  catch(execption: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = execption.getStatus();
    const { error, message }: any = execption.getResponse();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
      message,
    });
  }
}
