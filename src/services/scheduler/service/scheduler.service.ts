import { scheduleJob } from 'node-schedule';
import { Injectable, HttpService, Logger } from '@nestjs/common';
import { CollectorConfig } from 'src/shared/collector-config/type';
import { CollectorService } from '../../collector/service/collector.service';

@Injectable()
export class SchedulerService {
  private readonly _logger = new Logger(this.constructor.name);

  constructor(private readonly _collectorService: CollectorService, private readonly _httpService: HttpService) {}

  schedule(configs: CollectorConfig[]): void {
    if (!configs?.length) return;
    for (const config of configs) {
      scheduleJob(config.schedule, async () => this._runJob(config));
    }
  }

  private async _runJob(config: CollectorConfig): Promise<void> {
    try {
      this._logger.log(`Starting job "${config.id}"`);
      const results = await this._collectorService.collect(config);
      const reply = await this._httpService
        .post(`http://192.168.1.104:3000/node/${config.id}/batch`, results)
        .toPromise();
      this._logger.log(`Job "${config.id}" completed: ${reply.statusText}`);
    } catch (error) {
      this._logger.error(`Job "${config.id}" failed`, error);
    }
  }
}
