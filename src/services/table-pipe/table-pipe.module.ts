import { Module } from '@nestjs/common';

import { ExtractorModule } from '../extractor/extractor.module';
import { PostProcessorModule } from '../post-processor/post-processor.module';
import { TablePipeService } from './service/table-pipe.service';

@Module({
  imports: [ExtractorModule, PostProcessorModule],
  providers: [TablePipeService],
  exports: [TablePipeService]
})
export class TablePipeModule {}
