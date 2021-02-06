import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PipesConfig } from 'src/shared/collector-config/type';
import { Config } from 'src/shared/const/config';

import { CollectorDefinitions } from '../dto';

@Injectable()
export class ConfiguratorService {
  private readonly _hubUrl = this._configService.get<string>(Config.hubUrl);

  constructor(private readonly _httpService: HttpService, private readonly _configService: ConfigService) {}

  async getConfigurations(): Promise<CollectorDefinitions> {
    const result = await this._httpService
      .get<CollectorDefinitions>(`${this._hubUrl}/definitions/collector`)
      .toPromise();
    const configs = result?.data;

    if (!configs?.length) return [];

    for (const config of configs) {
      if (typeof config?.definition?.pipes === 'string') {
        config.definition.pipes = await this._loadPipesTemplate(config.definition.pipes);
      }
    }

    return configs;
  }

  private async _loadPipesTemplate(id: string): Promise<PipesConfig> {
    const result = await this._httpService
      .get<PipesConfig>(`${this._hubUrl}/definitions/collector_pipes/${id}`)
      .toPromise();
    return result?.data || {};
  }
}
