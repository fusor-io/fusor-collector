import { ExtractorConfig } from './extractor-config';
import { PostProcessorConfig } from './post-processor-config';

export enum TablePipeType {
  csv = 'csv',
  html = 'html',
  json = 'json',
}

export enum TablePipeDirection {
  rows = 'rows',
  columns = 'columns',
}

export interface TablePipeElement {
  name: string; // jsonata query, returning param name
  value: string; // jsonata query, returning param value
  iterate: TablePipeDirection;
  postProcess?: PostProcessorConfig[];
  numberFormat?: string;
}

export interface TablePipeCsvParams {
  delimiter?: string;
  escape?: string;
}

export interface TablePipeConfig {
  extract?: ExtractorConfig;
  type: TablePipeType;
  params?: TablePipeCsvParams;
  elements: TablePipeElement[];
}
