import { Module } from '@nestjs/common';
import { PostProcessorModule } from '../post-processor/post-processor.module';
import { ExtractorModule } from '../extractor/extractor.module';
import { PipeService } from './service/pipe.service';

@Module({
  imports: [ExtractorModule, PostProcessorModule],
  providers: [PipeService],
  exports: [PipeService],
})
export class PipeModule {}
