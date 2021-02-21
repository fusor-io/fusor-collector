import { HttpModule, Module, OnModuleInit } from '@nestjs/common';

import { CollectorModule } from '../collector/collector.module';
import { ConfiguratorModule } from '../configurator';
import { SchedulerService } from './service/scheduler.service';

@Module({
  imports: [HttpModule, CollectorModule, ConfiguratorModule],
  providers: [SchedulerService],
  exports: [SchedulerService],
})
export class SchedulerModule implements OnModuleInit {
  constructor(private readonly _schedulerService: SchedulerService) {}

  onModuleInit() {
    setTimeout(() => this._schedulerService.schedule(), 3000);
  }
}
