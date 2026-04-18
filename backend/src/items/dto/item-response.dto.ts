import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

/**
 * The shape returned to API consumers.
 * Using a dedicated response DTO decouples the public API contract
 * from the internal database entity — entity columns can change without
 * breaking the contract, and we control exactly what is exposed.
 */
@Exclude()
export class ItemResponseDto {
  @Expose()
  @ApiProperty({ example: 1, description: 'Auto-generated primary key' })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Buy groceries', description: 'Item name' })
  name: string;

  @Expose()
  @ApiPropertyOptional({ example: 'Milk, eggs, bread', description: 'Optional description' })
  description?: string;

  @Expose()
  @ApiProperty({ description: 'ISO-8601 creation timestamp' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ description: 'ISO-8601 last-update timestamp' })
  updatedAt: Date;

  constructor(partial: Partial<ItemResponseDto>) {
    Object.assign(this, partial);
  }
}
