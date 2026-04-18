import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { SentimentsService } from './sentiments.service';
import { CreateSentimentDto } from './dto/create-sentiment.dto';
import { SentimentResponseDto, SummaryStatsDto } from './dto/sentiment-response.dto';

/**
 * Sentiments resource controller — versioned at /v1/sentiments.
 *
 * Endpoints consumed by the frontend:
 *   GET  /v1/sentiments          → load all on mount (replaces localStorage)
 *   GET  /v1/sentiments/summary  → SummaryPanel stats
 *   POST /v1/sentiments          → addSentiment() from SentimentContext
 *   DELETE /v1/sentiments/:id    → optional: admin delete
 */
@ApiTags('Sentiments')
@ApiTooManyRequestsResponse({ description: 'Too many requests — slow down' })
@UseGuards(ThrottlerGuard)
@Controller({ path: 'sentiments', version: '1' })
export class SentimentsController {
  constructor(private readonly sentimentsService: SentimentsService) {}

  // ─── Read ─────────────────────────────────────────────────────────────────

  @Get()
  @ApiOperation({
    summary: 'List all sentiments',
    description: 'Returns every sentiment ordered newest-first. Used by the frontend on mount.',
  })
  @ApiOkResponse({ type: [SentimentResponseDto] })
  findAll(): Promise<SentimentResponseDto[]> {
    return this.sentimentsService.findAll();
  }

  @Get('summary')
  @ApiOperation({
    summary: 'Get aggregate summary stats',
    description: 'Returns totalSentiments and averageRating. Used by the SummaryPanel.',
  })
  @ApiOkResponse({ type: SummaryStatsDto })
  getSummary(): Promise<SummaryStatsDto> {
    return this.sentimentsService.getSummaryStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one sentiment by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: SentimentResponseDto })
  @ApiNotFoundResponse({ description: 'Sentiment not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SentimentResponseDto> {
    return this.sentimentsService.findOne(id);
  }

  // ─── Write ────────────────────────────────────────────────────────────────

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Submit a new sentiment',
    description: 'Called by addSentiment() in SentimentContext when the user submits the form.',
  })
  @ApiCreatedResponse({ type: SentimentResponseDto })
  @ApiBadRequestResponse({ description: 'Validation failed (e.g. rating out of range)' })
  create(@Body() createSentimentDto: CreateSentimentDto): Promise<SentimentResponseDto> {
    return this.sentimentsService.create(createSentimentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a sentiment (admin use)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiNoContentResponse({ description: 'Sentiment deleted' })
  @ApiNotFoundResponse({ description: 'Sentiment not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.sentimentsService.remove(id);
  }
}
