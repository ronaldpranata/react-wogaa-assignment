import { NestFactory, Reflector } from "@nestjs/core";
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";
import { AppConfig } from "./config/app.config";

async function bootstrap(): Promise<void> {
  const logger = new Logger("Bootstrap");

  const app = await NestFactory.create(AppModule, {
    // Use NestJS built-in logger — no raw console.log anywhere in the app
    logger: ["log", "warn", "error", "debug"],
  });

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>("app")!;

  // ─── Security: HTTP Headers ──────────────────────────────────────────────
  // Helmet sets Content-Security-Policy, HSTS, X-Frame-Options, and more.
  app.use(helmet());

  // ─── Security: CORS ──────────────────────────────────────────────────────
  // Origins are driven by the ALLOWED_ORIGINS env var — never hard-coded.
  app.enableCors({
    origin: appConfig.allowedOrigins,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  // ─── API Versioning ──────────────────────────────────────────────────────
  // URI versioning: /v1/items, /v2/items, etc.
  app.enableVersioning({ type: VersioningType.URI });

  // ─── Global Pipes ────────────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown properties
      forbidNonWhitelisted: true, // reject requests with unknown properties
      transform: true, // auto-cast params / body to DTO types
      errorHttpStatusCode: 422, // Unprocessable Entity (more accurate than 400)
    }),
  );

  // ─── Global Filters ──────────────────────────────────────────────────────
  app.useGlobalFilters(new HttpExceptionFilter());

  // ─── Global Interceptors ─────────────────────────────────────────────────
  // TransformInterceptor: wraps responses in { data, meta }
  app.useGlobalInterceptors(new TransformInterceptor());
  // ClassSerializerInterceptor: applies @Exclude / @Expose from class-transformer
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // ─── Swagger / OpenAPI ───────────────────────────────────────────────────
  // Only mount the docs UI in non-production environments
  if (appConfig.nodeEnv !== "production") {
    const swaggerConfig = new DocumentBuilder()
      .setTitle("WOGAA Sentiments API")
      .setDescription("NestJS REST API — Sentiments CRUD with SQLite")
      .setVersion("1.0")
      .addTag("Sentiments", "CRUD operations for the Sentiments resource")
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("api/docs", app, document, {
      swaggerOptions: { persistAuthorization: true },
    });
    logger.log(`📚 Swagger UI: http://localhost:${appConfig.port}/api/docs`);
  }

  await app.listen(appConfig.port);
  logger.log(
    `🚀 Server running on http://localhost:${appConfig.port} [${appConfig.nodeEnv}]`,
  );
  logger.log(
    `🛡  CORS allowed origins: ${appConfig.allowedOrigins.join(", ")}`,
  );
}

bootstrap();
