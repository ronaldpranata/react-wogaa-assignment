import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
  Version,
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
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemResponseDto } from './dto/item-response.dto';

/**
 * Items resource controller — versioned at /v1/items.
 *
 * All mutating endpoints (POST / PATCH / DELETE) are protected by a
 * stricter per-IP rate limit applied at the module level via ThrottlerGuard.
 */
@ApiTags('Items')
@ApiTooManyRequestsResponse({ description: 'Too many requests — slow down' })
@UseGuards(ThrottlerGuard)
@Controller({ path: 'items', version: '1' })
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // ─── READ ─────────────────────────────────────────────────────────────────

  @Get()
  @ApiOperation({ summary: 'List all items', description: 'Returns every item, newest first.' })
  @ApiOkResponse({ type: [ItemResponseDto] })
  findAll(): Promise<ItemResponseDto[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one item by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: ItemResponseDto })
  @ApiNotFoundResponse({ description: 'Item not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ItemResponseDto> {
    return this.itemsService.findOne(id);
  }

  // ─── WRITE ────────────────────────────────────────────────────────────────

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new item' })
  @ApiCreatedResponse({ type: ItemResponseDto })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  create(@Body() createItemDto: CreateItemDto): Promise<ItemResponseDto> {
    return this.itemsService.create(createItemDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update an item' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: ItemResponseDto })
  @ApiNotFoundResponse({ description: 'Item not found' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<ItemResponseDto> {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an item' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiNoContentResponse({ description: 'Item deleted' })
  @ApiNotFoundResponse({ description: 'Item not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.itemsService.remove(id);
  }
}
