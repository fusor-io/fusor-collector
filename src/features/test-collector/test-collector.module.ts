import { Module } from '@nestjs/common';

import { CollectorModule } from '../../services/collector/collector.module';
import { TestCollectorController } from './controller/test-collector.controller';

@Module({
  imports: [CollectorModule],
  controllers: [TestCollectorController],
})
export class TestCollectorModule {}
