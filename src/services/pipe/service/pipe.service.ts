import { PostProcessorService } from './../../post-processor/service/post-processor.service';
import { ExtractorService } from '../../extractor/service/extractor.service';
import { PipeConfig } from '../../../shared/collector-config/type/pipe-config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PipeService {
  constructor(
    private readonly _extractorService: ExtractorService,
    private readonly _postProcessorService: PostProcessorService,
  ) {}

  processPipe(pipeConfig: PipeConfig, source: string): string {
    let result = source;

    if (pipeConfig.extract) {
      result = this._extractorService.extract(pipeConfig.extract, result);
    }

    if (pipeConfig.postProcess?.length) {
      for (const config of pipeConfig.postProcess) {
        result = this._postProcessorService.postProcess(config, result);
      }
    }

    return result || '';
  }
}
