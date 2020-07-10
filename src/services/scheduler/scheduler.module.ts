import { ConfiguratorModule } from './../configurator/configurator.module';
import { Module, HttpModule, OnModuleInit } from '@nestjs/common';
import { CollectorModule } from '../collector/collector.module';
import { SchedulerService } from './service/scheduler.service';

@Module({
  imports: [HttpModule, CollectorModule, ConfiguratorModule],
  providers: [SchedulerService],
})
export class SchedulerModule implements OnModuleInit {
  constructor(private readonly _schedulerService: SchedulerService) {}

  onModuleInit() {
    setTimeout(() => this._schedulerService.schedule(), 3000);
  }
}
