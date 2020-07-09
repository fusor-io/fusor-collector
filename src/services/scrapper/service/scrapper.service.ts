import { Injectable, HttpService, Logger } from '@nestjs/common';
import { SourceConfig, SourceType } from 'src/shared/collector-config/type';

@Injectable()
export class ScrapperService {
  private readonly _logger = new Logger(this.constructor.name);

  constructor(private readonly _httpService: HttpService) {}

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
    const result = await this._httpService.get(source.uri).toPromise();
    if (result.data) {
      return result.data;
    } else {
      this._logger.error(`Failed fetching url: ${source.uri}`, result.statusText);
      return '';
    }
  }

  private async _runShell(source: SourceConfig): Promise<string> {
    return '';
  }
}
