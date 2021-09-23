import { Injectable } from '@nestjs/common';
import * as numeral from 'numeral';

import { CollectorConfig } from '../../../shared/collector-config/type/collector-config';
import { CollectorResult } from '../../../shared/collector-config/type/collector-result';
import { PipeService } from '../../pipe/service/pipe.service';
import { ScrapperService } from '../../scrapper/service/scrapper.service';

@Injectable()
export class CollectorService {
  constructor(private readonly _pipeService: PipeService, private readonly _scrapperService: ScrapperService) {}

  async collect(collectorConfig: CollectorConfig): Promise<CollectorResult> {
    const result: CollectorResult = {};

    if (!collectorConfig.source) return result;
    const source = await this._scrapperService.readSource(collectorConfig.source);

    if (collectorConfig.pipes) {
      const params = Object.keys(collectorConfig.pipes);

      for (const param of params) {
        const pipeOutput = this._pipeService.processPipe(collectorConfig.pipes[param], source);
        result[param] = typeof pipeOutput === 'string' ? numeral(pipeOutput.toLowerCase()).value() : pipeOutput;
      }
    }

    if (collectorConfig.tablePipes) {
      for (const table of collectorConfig.tablePipes) {
        // TODO read table
      }
    }

    return result;
  }
}
