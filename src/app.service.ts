import { Injectable } from '@nestjs/common';

import { LogLevelManagerService } from './services/log-level-manager/service/log-level-manager.service';
import { SchedulerService } from './services/scheduler/service/scheduler.service';

@Injectable()
export class AppService {
  constructor(
    private readonly _schedulerService: SchedulerService,
    private readonly _logLevelManager: LogLevelManagerService,
  ) {}

  healthCheck(): Record<string, string> {
    return { status: 'ok' };
  }

  async reload(): Promise<void> {
    await this._schedulerService.reload();
    this._logLevelManager.scheduleLevelUpdate;
  }
}
