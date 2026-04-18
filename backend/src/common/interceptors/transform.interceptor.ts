import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
  data: T;
  meta: {
    timestamp: string;
  };
}

/**
 * Global transform interceptor.
 * Wraps every successful response in a consistent envelope:
 *
 * {
 *   "data": <actual payload>,
 *   "meta": { "timestamp": "..." }
 * }
 *
 * Note: 204 No Content responses are not wrapped (data is undefined/null/void).
 */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T> | void>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T> | void> {
    return next.handle().pipe(
      map((data) => {
        // 204 responses have no body — pass through as-is
        if (data === undefined || data === null) return undefined;
        return {
          data,
          meta: { timestamp: new Date().toISOString() },
        };
      }),
    );
  }
}
