import { Body, Controller, Post } from '@nestjs/common';

import { CollectorService } from '../../../services/collector/service/collector.service';
import { CollectorConfig } from '../../../shared/type';

@Controller('test')
export class TestCollectorController {
  constructor(private readonly _collectorService: CollectorService) {}

  @Post()
  testCollector(@Body() body: CollectorConfig): Promise<object> {
    return this._collectorService.collect(body);
  }
}
