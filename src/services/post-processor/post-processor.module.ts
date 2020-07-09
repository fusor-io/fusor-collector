import { Module } from '@nestjs/common';
import { PostProcessorService } from './service/post-processor.service';

@Module({
  providers: [PostProcessorService],
  exports: [PostProcessorService],
})
export class PostProcessorModule {}
