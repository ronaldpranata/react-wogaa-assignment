import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateItemDto {
  @ApiPropertyOptional({
    example: 'Updated name',
    description: 'New name for the item (max 255 chars)',
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({
    example: 'Updated description',
    description: 'New description for the item',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
