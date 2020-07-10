import { ConfiguratorService } from './../../configurator/service/configurator.service';
import { scheduleJob } from 'node-schedule';
import { Injectable, HttpService, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CollectorConfig } from 'src/shared/collector-config/type';
import { CollectorService } from '../../collector/service/collector.service';
import { Config } from 'src/shared/const/config';

@Injectable()
export class SchedulerService {
  private readonly _logger = new Logger(this.constructor.name);
  private readonly _gatewayUrl = this._configService.get<string>(Config.gatewayUrl);

  constructor(
    private readonly _configService: ConfigService,
    private readonly _httpService: HttpService,
    private readonly _collectorService: CollectorService,
    private readonly _configuratorService: ConfiguratorService,
  ) {}

  async schedule(): Promise<void> {
    const configs = await this._configuratorService.getConfigurations();

    if (!configs?.length) return;

    for (const config of configs) {
      const { definition, node } = config;
      scheduleJob(definition.schedule, async () => this._runJob(node, definition));
    }
  }

  private async _runJob(id: string, config: CollectorConfig): Promise<void> {
    try {
      this._logger.log(`Starting job "${id}"`);

      const results = await this._collectorService.collect(config);
      const reply = await this._httpService.post(`${this._gatewayUrl}/node/${id}/batch`, results).toPromise();

      this._logger.log(`Job "${id}" completed: ${reply.statusText}`);
    } catch (error) {
      this._logger.error(`Job "${id}" failed`, error);
    }
  }
}
