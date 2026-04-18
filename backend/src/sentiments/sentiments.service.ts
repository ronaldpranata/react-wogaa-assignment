import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Sentiment } from './sentiment.entity';
import { CreateSentimentDto } from './dto/create-sentiment.dto';
import { SentimentResponseDto, SummaryStatsDto } from './dto/sentiment-response.dto';

@Injectable()
export class SentimentsService {
  private readonly logger = new Logger(SentimentsService.name);

  constructor(
    @InjectRepository(Sentiment)
    private readonly sentimentsRepository: Repository<Sentiment>,
  ) {}

  /**
   * Fetch all sentiments, ordered newest-first.
   * Matches the frontend's useEffect that loads all sentiments on mount.
   */
  async findAll(): Promise<SentimentResponseDto[]> {
    const sentiments = await this.sentimentsRepository.find({
      order: { createdAt: 'DESC' },
    });
    return this.toResponseDtoList(sentiments);
  }

  /**
   * Find a single sentiment by its primary key.
   * @throws NotFoundException when not found.
   */
  async findOne(id: number): Promise<SentimentResponseDto> {
    const sentiment = await this.sentimentsRepository.findOne({ where: { id } });
    if (!sentiment) {
      throw new NotFoundException(`Sentiment #${id} not found`);
    }
    return this.toResponseDto(sentiment);
  }

  /**
   * Persist a new sentiment submitted by the user.
   * Returns the created record including the server-assigned id and timestamp.
   */
  async create(dto: CreateSentimentDto): Promise<SentimentResponseDto> {
    const entity = this.sentimentsRepository.create({
      rating: dto.rating,
      comment: dto.comment ?? '',
    });
    const saved = await this.sentimentsRepository.save(entity);
    this.logger.log(`Created sentiment #${saved.id} (rating=${saved.rating})`);
    return this.toResponseDto(saved);
  }

  /**
   * Delete a sentiment by primary key.
   * @throws NotFoundException when not found.
   */
  async remove(id: number): Promise<void> {
    const result = await this.sentimentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sentiment #${id} not found`);
    }
    this.logger.log(`Deleted sentiment #${id}`);
  }

  /**
   * Aggregate stats — called by the frontend SummaryPanel.
   * Computed in-DB so we never load all rows into memory.
   */
  async getSummaryStats(): Promise<SummaryStatsDto> {
    const result = await this.sentimentsRepository
      .createQueryBuilder('s')
      .select('COUNT(s.id)', 'total')
      .addSelect('AVG(s.rating)', 'avg')
      .getRawOne<{ total: string; avg: string | null }>();

    const total = parseInt(result?.total ?? '0', 10);
    const avg = result?.avg ? parseFloat(result.avg) : 0;

    return {
      totalSentiments: total,
      averageRating: total > 0 ? Number(avg.toFixed(1)) : 0,
    };
  }

  // ─── Private helpers ──────────────────────────────────────────────────────

  private toResponseDto(entity: Sentiment): SentimentResponseDto {
    return plainToInstance(SentimentResponseDto, entity, {
      excludeExtraneousValues: true,
    });
  }

  private toResponseDtoList(entities: Sentiment[]): SentimentResponseDto[] {
    return entities.map((e) => this.toResponseDto(e));
  }
}
