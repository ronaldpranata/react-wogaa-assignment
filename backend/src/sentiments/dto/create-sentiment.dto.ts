import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateSentimentDto {
  @ApiProperty({
    example: 4,
    description: 'Rating from 1 (worst) to 5 (best)',
    minimum: 1,
    maximum: 5,
  })
  @IsInt({ message: 'rating must be an integer' })
  @Min(1, { message: 'rating must be at least 1' })
  @Max(5, { message: 'rating must be at most 5' })
  rating: number;

  @ApiPropertyOptional({
    example: 'Great experience overall!',
    description: 'Optional free-text comment from the user',
  })
  @IsString()
  @IsOptional()
  comment?: string;
}
