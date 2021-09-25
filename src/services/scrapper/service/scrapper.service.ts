import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { exec } from 'child_process';
import * as path from 'path';

import { Config } from '../../../shared/const/config';
import { SourceConfig, SourceType } from '../../../shared/type';
import { USER_AGENT } from '../const';

@Injectable()
export class ScrapperService {
  private readonly _logger = new Logger(this.constructor.name);
  private readonly _shellScripts = this._configService.get<string>(Config.shellScripts);

  constructor(private readonly _httpService: HttpService, private readonly _configService: ConfigService) {}

  async readSource(source: SourceConfig): Promise<string> {
    switch (source.type) {
      case SourceType.url:
        return this._fetchUrl(source);
      case SourceType.shell:
        return this._runShell(source);
      default:
        return '';
    }
  }

  private async _fetchUrl(source: SourceConfig): Promise<string> {
    const result = await this._httpService
      .get(source.uri, { headers: { ...source.headers, 'User-Agent': USER_AGENT } })
      .toPromise();
    if (result.data) {
      return result.data;
    } else {
      this._logger.error(`Failed fetching url: ${source.uri}`, result.statusText);
      return '';
    }
  }

  private async _runShell(source: SourceConfig): Promise<string> {
    // Remove path part. We want only scripts located in our folder to be executed
    const scriptName = source.uri.replace(/\/*\.*\//g, '');
    if (!scriptName) {
      this._logger.error('Failed parsing shell file name');
      return '';
    }

    const scriptPath = path.join('./', this._shellScripts, scriptName);

    return new Promise(resolve =>
      exec(scriptPath, (err, stdout, stderr) => {
        if (err) {
          this._logger.error(`Failed executing script: ${err.message}`, stderr);
          resolve('');
        } else {
          resolve(stdout);
        }
      }),
    );
  }
}
