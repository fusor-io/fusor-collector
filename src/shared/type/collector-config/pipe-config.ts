import { PostProcessorConfig } from './post-processor-config';
import { ExtractorConfig } from './extractor-config';

export interface PipeConfig {
  extract?: ExtractorConfig;
  postProcess?: PostProcessorConfig[];
  numberFormat?: string;
}

export interface PipesConfig {
  [param: string]: PipeConfig;
}
