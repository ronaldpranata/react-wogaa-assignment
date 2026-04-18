import { registerAs } from '@nestjs/config';

/**
 * Typed configuration factory.
 * Loaded by ConfigModule and injected anywhere via ConfigService.
 *
 * Access pattern:
 *   constructor(private config: ConfigService) {}
 *   this.config.get<AppConfig>('app').port
 */
export interface AppConfig {
  port: number;
  nodeEnv: string;
  allowedOrigins: string[];
  throttleTtlSeconds: number;
  throttleLimit: number;
  dbPath: string;
}

export default registerAs('app', (): AppConfig => {
  const origins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  return {
    port: parseInt(process.env.PORT ?? '3000', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
    allowedOrigins: origins,
    throttleTtlSeconds: parseInt(process.env.THROTTLE_TTL_SECONDS ?? '60', 10),
    throttleLimit: parseInt(process.env.THROTTLE_LIMIT ?? '60', 10),
    dbPath: process.env.DB_PATH ?? 'database.sqlite',
  };
});
