import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemResponseDto } from './dto/item-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ItemsService {
  private readonly logger = new Logger(ItemsService.name);

  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  /**
   * Retrieve all items, ordered newest-first.
   * Returns serialised response DTOs (never raw entities).
   */
  async findAll(): Promise<ItemResponseDto[]> {
    const items = await this.itemsRepository.find({
      order: { createdAt: 'DESC' },
    });
    return this.toResponseDtoList(items);
  }

  /**
   * Retrieve a single item by primary key.
   * @throws NotFoundException when the record does not exist.
   */
  async findOne(id: number): Promise<ItemResponseDto> {
    const item = await this.itemsRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    return this.toResponseDto(item);
  }

  /**
   * Create a new item and return the persisted, serialised record.
   */
  async create(dto: CreateItemDto): Promise<ItemResponseDto> {
    const item = this.itemsRepository.create(dto);
    const saved = await this.itemsRepository.save(item);
    this.logger.log(`Created item #${saved.id}`);
    return this.toResponseDto(saved);
  }

  /**
   * Partially update an existing item.
   * Only fields present in the DTO are changed (PATCH semantics).
   * @throws NotFoundException when the record does not exist.
   */
  async update(id: number, dto: UpdateItemDto): Promise<ItemResponseDto> {
    // preload() builds the entity from the DB then merges the partial DTO —
    // safer than Object.assign on a detached entity.
    const item = await this.itemsRepository.preload({ id, ...dto });
    if (!item) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    const saved = await this.itemsRepository.save(item);
    this.logger.log(`Updated item #${saved.id}`);
    return this.toResponseDto(saved);
  }

  /**
   * Hard-delete an item by primary key.
   * @throws NotFoundException when the record does not exist.
   */
  async remove(id: number): Promise<void> {
    // Use delete() rather than remove() — avoids a superfluous SELECT.
    const result = await this.itemsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    this.logger.log(`Deleted item #${id}`);
  }

  // ─── Private helpers ──────────────────────────────────────────────────────

  private toResponseDto(item: Item): ItemResponseDto {
    return plainToInstance(ItemResponseDto, item, {
      excludeExtraneousValues: true,
    });
  }

  private toResponseDtoList(items: Item[]): ItemResponseDto[] {
    return items.map((item) => this.toResponseDto(item));
  }
}
