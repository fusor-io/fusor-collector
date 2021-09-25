import { Injectable, Logger } from '@nestjs/common';
import * as parse from 'csv-parse/lib/sync';
import * as jsonata from 'jsonata';
import { inspect } from 'util';

import {
  JsonArray,
  PostProcessorConfig,
  RawResult,
  TablePipeConfig,
  TablePipeDirection,
  TablePipeElement,
  TablePipeType,
} from '../../../shared/type';
import { ExtractorService } from '../../extractor/service/extractor.service';
import { PostProcessorService } from '../../post-processor/service/post-processor.service';
import { DEFAULT_CSV_PARAMS } from '../const';

@Injectable()
export class TablePipeService {
  private readonly _logger = new Logger(this.constructor.name);

  constructor(
    private readonly _extractorService: ExtractorService,
    private readonly _postProcessorService: PostProcessorService,
  ) {}

  processTable(pipeConfig: TablePipeConfig, source: string): RawResult {
    const result: RawResult = {};

    if (pipeConfig.extract) {
      source = this._extractorService.extract(pipeConfig.extract, source).toString();
    }

    let rows: JsonArray[] = [];
    if (pipeConfig.type === TablePipeType.csv) {
      try {
        rows = parse(source, { ...DEFAULT_CSV_PARAMS, ...pipeConfig.params });
      } catch (error) {
        this._logger.error(`Failed parsing CSV: ${inspect(error)}`);
      }
    }
    // TODO implement HTML table processor

    for (const elementConfig of pipeConfig.elements ?? []) {
      if (elementConfig.iterate === TablePipeDirection.rows || !elementConfig.iterate) {
        this._iterateRows(rows, result, elementConfig);
      }
      // TODO implement column-wise iterator
    }

    return result;
  }

  private _iterateRows(rows: JsonArray[], accumulator: RawResult, config: TablePipeElement): void {
    for (const row of rows) {
      // TODO cache compiled expressions
      try {
        let expression = jsonata(config.name);
        const name = expression.evaluate(row);

        expression = jsonata(config.value);
        let value = expression.evaluate(row);

        if (config.postProcess?.length) {
          value = this._postProcess(config.postProcess, value);
        }

        accumulator[name] = value;
      } catch (error) {
        this._logger.error(`Failed evaluating table row: ${inspect(error)}`);
      }
    }
  }

  private _postProcess(config: PostProcessorConfig[], value: string | number): string {
    value = value.toString();

    for (const processorConfig of config) {
      value = this._postProcessorService.postProcess(processorConfig, value);
    }
    return value;
  }
}
