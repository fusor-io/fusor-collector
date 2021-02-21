import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Config } from '../../../shared/const/config';

@Injectable()
export class HubClientService {
  private readonly _logger = new Logger(this.constructor.name);
  private readonly _hubUrl = this._configService.get<string>(Config.hubUrl);

  constructor(private readonly _httpService: HttpService, private readonly _configService: ConfigService) {}

  async getDefinitions<T>(definitionType: string): Promise<T[]> {
    try {
      const result = await this._httpService.get<T[]>(`${this._hubUrl}/definitions/${definitionType}`).toPromise();
      const configs = result?.data;

      return configs?.length ? configs : [];
    } catch (error) {
      this._logger.error(`Failed reading definitions of type ${definitionType}`, error?.message);
      return [];
    }
  }

  async getDefinition<T>(definitionType: string, definitionId: string): Promise<T | undefined> {
    try {
      const result = await this._httpService
        .get<T>(`${this._hubUrl}/definitions/${definitionType}/${definitionType}`)
        .toPromise();
      return result?.data;
    } catch (error) {
      this._logger.error(`Failed reading definition ${definitionType}:${definitionType}`, error?.message);
      return undefined;
    }
  }

  async getParam(nodeId: string, paramId: string): Promise<number | undefined> {
    try {
      const result = await this._httpService
        .get<number>(`${this._hubUrl}/node/${nodeId}/${paramId}`, {
          headers: {
            'Cache-Control': 'no-cache',
          },
        })
        .toPromise();
      return result?.data;
    } catch (error) {
      return undefined;
    }
  }
}
