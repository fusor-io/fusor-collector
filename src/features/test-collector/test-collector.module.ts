import { Module } from '@nestjs/common';
import { PipeModule } from 'src/services/pipe/pipe.module';
import { ScrapperModule } from 'src/services/scrapper/scrapper.module';

import { TestCollectorController } from './controller/test-collector.controller';

@Module({
  imports: [PipeModule, ScrapperModule],
  controllers: [TestCollectorController],
})
export class TestCollectorModule {}
