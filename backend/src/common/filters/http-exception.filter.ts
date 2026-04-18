import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Global HTTP exception filter.
 *
 * Responsibilities:
 *  - Produce a consistent error envelope for every error response.
 *  - Log 5xx errors with full context; log 4xx at warn level only.
 *  - NEVER leak stack traces or internal messages to the client in production.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // Extract the developer message (safe for HTTP exceptions)
    const rawResponse = isHttpException ? exception.getResponse() : null;
    const devMessage =
      typeof rawResponse === 'string'
        ? rawResponse
        : (rawResponse as any)?.message ?? 'Internal server error';

    const isProduction = process.env.NODE_ENV === 'production';

    // Log 5xx with full error, 4xx at warn
    if (status >= 500) {
      this.logger.error(
        `[${request.method}] ${request.url} → ${status}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    } else {
      this.logger.warn(
        `[${request.method}] ${request.url} → ${status}: ${JSON.stringify(devMessage)}`,
      );
    }

    response.status(status).json({
      statusCode: status,
      // In production, hide internal details from 5xx responses
      message: status >= 500 && isProduction ? 'Internal server error' : devMessage,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
