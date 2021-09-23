import { ExtractorConfig } from './extractor-config';
import { PostProcessorConfig } from './post-processor-config';

export enum TablePipeType {
  csv = 'csv',
  html = 'html',
  json = 'json',
}

export interface TablePipeElement {
  param: string;
  value: string;
  postProcess?: PostProcessorConfig[];
  numberFormat?: string;
}

export interface TablePipeConfig {
  extract?: ExtractorConfig;
  type: TablePipeType;
  elements: TablePipeElement[];
}
