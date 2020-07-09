import { TESLA_STOCKS_CONFIG } from './mocks/zacks.mock';
import { CollectorService } from './services/collector/service/collector.service';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService, private readonly _collectorService: CollectorService) {}

  @Get()
  async getHello() {
    const result = await this._collectorService.collect(TESLA_STOCKS_CONFIG);
    return result;
  }
}
