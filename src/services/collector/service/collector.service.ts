import { Injectable } from '@nestjs/common';
import * as numeral from 'numeral';

import { ScrapperService } from '../../scrapper/service/scrapper.service';
import { CollectorResult } from '../../../shared/collector-config/type/collector-result';
import { CollectorConfig } from '../../../shared/collector-config/type/collector-config';
import { PipeService } from '../../pipe/service/pipe.service';

@Injectable()
export class CollectorService {
  constructor(private readonly _pipeService: PipeService, private readonly _scrapperService: ScrapperService) {}

  async collect(collectorConfig: CollectorConfig): Promise<CollectorResult> {
    const result: CollectorResult = {};

    if (!collectorConfig.source) return result;
    const source = await this._scrapperService.readSource(collectorConfig.source);

    if (!collectorConfig.pipes) return result;
    const params = Object.keys(collectorConfig.pipes);

    for (const param of params) {
      result[param] = numeral(
        this._pipeService.processPipe(collectorConfig.pipes[param], source).toLowerCase(),
      ).value();
    }

    return result;
  }
}
