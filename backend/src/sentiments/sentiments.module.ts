import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sentiment } from './sentiment.entity';
import { SentimentsController } from './sentiments.controller';
import { SentimentsService } from './sentiments.service';

export { Sentiment } from './sentiment.entity';
export { SentimentsService } from './sentiments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sentiment])],
  controllers: [SentimentsController],
  providers: [SentimentsService],
  exports: [SentimentsService],
})
export class SentimentsModule {}
