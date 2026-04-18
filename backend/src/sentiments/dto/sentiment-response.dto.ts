import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

/**
 * Response DTO — the exact shape the frontend expects:
 * { id: string, rating: number, comment: string, createdAt: string }
 *
 * The frontend uses string IDs (crypto.randomUUID() was used before),
 * so we coerce the integer PK to a string.
 */
@Exclude()
export class SentimentResponseDto {
  @Expose()
  @Transform(({ value }) => String(value))
  @ApiProperty({ example: '1', description: 'Sentiment ID (string)' })
  id: string;

  @Expose()
  @ApiProperty({ example: 4, description: 'Rating (1–5)' })
  rating: number;

  @Expose()
  @ApiPropertyOptional({ example: 'Great experience!', description: 'User comment' })
  comment: string;

  @Expose()
  @Transform(({ value }) => (value instanceof Date ? value.toISOString() : value))
  @ApiProperty({ description: 'ISO-8601 creation timestamp' })
  createdAt: string;

  constructor(partial: Partial<SentimentResponseDto>) {
    Object.assign(this, partial);
  }
}

/**
 * Summary stats returned by GET /v1/sentiments/summary
 * to match SummaryStats in the frontend.
 */
export class SummaryStatsDto {
  @ApiProperty({ example: 12 })
  totalSentiments: number;

  @ApiProperty({ example: 3.8 })
  averageRating: number;
}
