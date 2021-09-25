import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Config } from '../../../shared/const/config';
import { PipesConfig } from '../../../shared/type';
import { DefinitionType, HubClientService } from '../../hub-client';
import { CollectorDefinition, CollectorDefinitions } from '../dto';

@Injectable()
export class ConfiguratorService {
  private readonly _logger = new Logger(this.constructor.name);
  private readonly _hubUrl = this._configService.get<string>(Config.hubUrl);

  constructor(private readonly _hubClientService: HubClientService, private readonly _configService: ConfigService) {}

  async getConfigurations(): Promise<CollectorDefinitions> {
    const configs = await this._hubClientService.getDefinitions<CollectorDefinition>(DefinitionType.collector);

    if (!configs?.length) return [];

    for (const config of configs) {
      if (typeof config?.definition?.pipes === 'string') {
        config.definition.pipes = await this._loadPipesTemplate(config.definition.pipes);
      }
    }

    return configs;
  }

  private async _loadPipesTemplate(id: string): Promise<PipesConfig> {
    const result = await this._hubClientService.getDefinition<PipesConfig>(DefinitionType.collectorPipes, id);
    return result || {};
  }
}
