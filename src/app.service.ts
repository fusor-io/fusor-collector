import { Injectable } from '@nestjs/common';

import { SchedulerService } from './services/scheduler/service/scheduler.service';

@Injectable()
export class AppService {
  constructor(private readonly _schedulerService: SchedulerService) {}

  healthCheck(): Record<string, string> {
    return { status: 'ok' };
  }

  async reload(): Promise<void> {
    return this._schedulerService.reload();
  }
}
