import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import appConfig, { AppConfig } from './config/app.config';
import { ItemsModule } from './items/items.module';
import { Item } from './items/item.entity';
import * as path from 'path';

@Module({
  imports: [
    // ─── Configuration ──────────────────────────────────────────────────────
    // isGlobal: true → no need to import ConfigModule in every feature module.
    // envFilePath loads .env in development; in production, inject env vars
    // directly via CI/CD secrets.
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig],
    }),

    // ─── Rate limiting ──────────────────────────────────────────────────────
    // Applied globally via APP_GUARD — controllers can override per-route.
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const app = config.get<AppConfig>('app');
        return [
          {
            ttl: (app?.throttleTtlSeconds ?? 60) * 1000, // ms
            limit: app?.throttleLimit ?? 60,
          },
        ];
      },
    }),

    // ─── Database ───────────────────────────────────────────────────────────
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const app = config.get<AppConfig>('app');
        const dbPath = path.resolve(process.cwd(), app?.dbPath ?? 'database.sqlite');
        return {
          type: 'sqljs',
          location: dbPath,
          autoSave: true,
          entities: [Item],
          // synchronize:true is acceptable in dev; use migrations in production
          synchronize: app?.nodeEnv !== 'production',
          logging: app?.nodeEnv === 'development',
        };
      },
    }),

    // ─── Feature modules ────────────────────────────────────────────────────
    ItemsModule,
  ],
})
export class AppModule {}
