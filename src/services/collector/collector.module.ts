import { Module } from '@nestjs/common';

import { PipeModule } from '../pipe/pipe.module';
import { ScrapperModule } from '../scrapper/scrapper.module';
import { TablePipeModule } from './../table-pipe/table-pipe.module';
import { CollectorService } from './service/collector.service';

@Module({
  imports: [PipeModule, ScrapperModule, TablePipeModule],
  providers: [CollectorService],
  exports: [CollectorService],
})
export class CollectorModule {}
