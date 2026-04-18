import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

// Barrel re-exports for consumers outside this module
export { Item } from './item.entity';
export { ItemsService } from './items.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [ItemsService],
  // Export service so other modules can inject it if needed
  exports: [ItemsService],
})
export class ItemsModule {}
