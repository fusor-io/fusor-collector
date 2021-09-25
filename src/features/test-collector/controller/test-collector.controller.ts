import { Body, Controller, Post } from '@nestjs/common';

import { CollectorService } from '../../../services/collector/service/collector.service';
import { CollectorConfig } from '../../../shared/type';

@Controller('test')
export class TestCollectorController {
  constructor(
    private readonly _collectorService: CollectorService,
  ) {}

  @Post()
  async testCollector(@Body() body: CollectorConfig): Promise<object> {
    // const result = {};

    const result = await this._collectorService.collect(body);

    // if (!body.source) return result;
    // const source = await this._scrapperService.readSource(body.source);

    // if (!body.pipes) return result;
    // const params = Object.keys(body.pipes);

    // for (const param of params) {
    //   const pipeOutput = this._pipeService.processPipe(body.pipes[param], source);
    //   result[param] = typeof pipeOutput === 'string' ? numeral(pipeOutput.toLowerCase()).value() : pipeOutput;
    // }

    return result;
  }
}
