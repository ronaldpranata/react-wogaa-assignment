import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({
    example: 'Buy groceries',
    description: 'Name of the item (required, max 255 chars)',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty({ message: 'name must not be empty' })
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    example: 'Milk, eggs, bread',
    description: 'Optional longer description',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
