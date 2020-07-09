import { Module } from '@nestjs/common';
import { ScrapperModule } from '../scrapper/scrapper.module';
import { PipeModule } from '../pipe/pipe.module';
import { CollectorService } from './service/collector.service';

@Module({
  imports: [PipeModule, ScrapperModule],
  providers: [CollectorService],
  exports: [CollectorService],
})
export class CollectorModule {}
