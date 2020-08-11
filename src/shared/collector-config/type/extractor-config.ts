export enum ExtractorType {
  cssSelector = 'css',
  jsonSelector = 'json',
}

export type ExtractorConfig = ExtractorConfigCss | ExtractorConfigJson;

export interface ExtractorConfigCss {
  type: ExtractorType.cssSelector;
  query: string;
  html2text?: boolean;
}

export interface ExtractorConfigJson {
  type: ExtractorType.jsonSelector;
  query: string;
}
