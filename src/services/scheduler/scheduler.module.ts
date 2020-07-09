import { Module, HttpModule, OnModuleInit } from '@nestjs/common';
import { CollectorModule } from '../collector/collector.module';
import { SchedulerService } from './service/scheduler.service';

import { TESLA_STOCKS_CONFIG } from './../../mocks/zacks.mock';

@Module({
  imports: [CollectorModule, HttpModule],
  providers: [SchedulerService],
})
export class SchedulerModule implements OnModuleInit {
  constructor(private readonly _schedulerService: SchedulerService) {}

  onModuleInit() {
    setTimeout(() => this._schedulerService.schedule([TESLA_STOCKS_CONFIG]), 3000);
  }
}
