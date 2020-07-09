export enum ExtractorType {
  cssSelector = 'css',
  jsonSelector = 'json',
}

export interface ExtractorConfig {
  type: ExtractorType;
  query: string;
}
