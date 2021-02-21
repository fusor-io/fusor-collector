import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { scheduledJobs, scheduleJob } from 'node-schedule';
import { CollectorConfig } from 'src/shared/collector-config/type';
import { Config } from 'src/shared/const/config';

import { CollectorService } from '../../collector/service/collector.service';
import { ConfiguratorService } from '../../configurator';

@Injectable()
export class SchedulerService {
  private readonly _logger = new Logger(this.constructor.name);
  private readonly _fusorUrl = this._configService.get<string>(Config.hubUrl);

  constructor(
    private readonly _configService: ConfigService,
    private readonly _httpService: HttpService,
    private readonly _collectorService: CollectorService,
    private readonly _configuratorService: ConfiguratorService,
  ) {}

  async schedule(): Promise<void> {
    const configs = await this._configuratorService.getConfigurations();
    this._logger.log(`${configs?.length || 0} configs available`);

    if (!configs?.length) return;

    for (const config of configs) {
      const { definition, key } = config;
      scheduleJob(key, definition.schedule, async () => this._runBatch(key, definition));
    }
  }

  async reload(): Promise<void> {
    this._logger.log('Reloading collectors...');

    Object.keys(scheduledJobs).forEach(jobName => {
      this._logger.log(`Canceling ${jobName}`);
      scheduledJobs[jobName].cancel();
    });

    await this.schedule();
    this._logger.log('...reloaded');
  }

  private async _runBatch(id: string, config: CollectorConfig): Promise<void> {
    if (!config) return;
    const { batch, targetNode } = config;
    if (batch) {
      const { source, schedule, pipes } = config;
      const batchItems = config.batch.items || [];

      this._logger.log(`Starting batch ${id} of ${batchItems.length}`);

      for (const item of batchItems) {
        try {
          const batchItemId = targetNode ? this._interpolate(targetNode, item) : `${id}_${item}`;
          const batchItemUri = this._interpolate(config?.source?.uri || '', item);
          const batchItemConfig: CollectorConfig = { source: { ...source, uri: batchItemUri }, schedule, pipes };
          await this._runJob(batchItemId, batchItemConfig);
          await this._sleep(config.batch.delay ?? 10);
        } catch (error) {
          this._logger.error(`Failed batch item ${JSON.stringify(item)}`);
        }
      }

      this._logger.log(`Batch ${id} completed`);
    } else {
      await this._runJob(targetNode || id, config);
    }
  }

  private _interpolate(source: string, value: string) {
    return source.replace(/\${\s*item\s*}/gi, value);
  }

  private async _sleep(seconds: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

  private async _runJob(id: string, config: CollectorConfig): Promise<void> {
    try {
      this._logger.log(`Starting job "${id}"`);

      const results = await this._collectorService.collect(config);
      const reply = await this._httpService.post(`${this._fusorUrl}/node/${id}/batch`, results).toPromise();

      this._logger.log(`Job "${id}" completed: ${reply.statusText}`);
    } catch (error) {
      this._logger.error(`Job "${id}" failed`, error);
    }
  }
}
