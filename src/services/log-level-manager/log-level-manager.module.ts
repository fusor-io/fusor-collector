import { Module, OnModuleInit } from '@nestjs/common';

import { HubClientModule } from '../hub-client';
import { LogLevelManagerService } from './service/log-level-manager.service';

@Module({
  imports: [HubClientModule],
  providers: [LogLevelManagerService],
  exports: [LogLevelManagerService],
})
export class LogLevelManagerModule implements OnModuleInit {
  constructor(private readonly _logLevelManager: LogLevelManagerService) {}

  onModuleInit() {
    // start with delay
    setTimeout(() => this._logLevelManager.scheduleLevelUpdate(), 10000);
  }
}
