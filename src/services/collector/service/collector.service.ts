import { Injectable } from '@nestjs/common';
import * as numeral from 'numeral';

import { CollectorConfig, CollectorResult, RawResult } from '../../../shared/type';
import { PipeService } from '../../pipe/service/pipe.service';
import { ScrapperService } from '../../scrapper/service/scrapper.service';
import { TablePipeService } from '../../table-pipe/service/table-pipe.service';

@Injectable()
export class CollectorService {
  constructor(
    private readonly _pipeService: PipeService,
    private readonly _scrapperService: ScrapperService,
    private readonly _tablePipeService: TablePipeService,
  ) {}

  async collect(collectorConfig: CollectorConfig): Promise<CollectorResult> {
    const result: RawResult = {};

    if (!collectorConfig.source) return {};
    const source = await this._scrapperService.readSource(collectorConfig.source);

    if (collectorConfig.pipes) {
      const params = Object.keys(collectorConfig.pipes);

      for (const param of params) {
        result[param] = this._pipeService.processPipe(collectorConfig.pipes[param], source);
      }
    }

    if (collectorConfig.tablePipes) {
      for (const table of collectorConfig.tablePipes) {
        const records = this._tablePipeService.processTable(table, source);
        Object.assign(result, records);
      }
    }

    // convert output to numbers
    return Object.keys(result).reduce((accumulator, key) => {
      const value = result[key];
      accumulator[key] = typeof value === 'string' ? numeral(value.toLowerCase()).value() : value ?? null;
      return accumulator;
    }, {} as CollectorResult);
  }
}
