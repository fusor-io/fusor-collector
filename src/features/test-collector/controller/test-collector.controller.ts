import { Body, Controller, Post } from '@nestjs/common';
import { PipeService } from 'src/services/pipe/service/pipe.service';
import { ScrapperService } from 'src/services/scrapper/service/scrapper.service';
import { CollectorConfig } from 'src/shared/collector-config/type';

@Controller('test')
export class TestCollectorController {
  constructor(private readonly _pipeService: PipeService, private readonly _scrapperService: ScrapperService) {}

  @Post()
  async testCollector(@Body() body: CollectorConfig): Promise<object> {
    const result = {};

    if (!body.source) return result;
    const source = await this._scrapperService.readSource(body.source);

    if (!body.pipes) return result;
    const params = Object.keys(body.pipes);

    for (const param of params) {
      const pipeOutput = this._pipeService.processPipe(body.pipes[param], source);
      result[param] = typeof pipeOutput === 'string' ? numeral(pipeOutput.toLowerCase()).value() : pipeOutput;
    }

    return result;
  }
}
