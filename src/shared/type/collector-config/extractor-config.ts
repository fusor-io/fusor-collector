export enum ExtractorType {
  cssSelector = 'css',
  jsonSelector = 'json',
}

export enum ExtractorHtmlTransform {
  innerText = 'inner-text',
  html2Text = 'html-to-text',
  rawHtml = 'raw-html',
}

export type ExtractorConfig = ExtractorConfigCss | ExtractorConfigJson;

export interface ExtractorConfigCss {
  type: ExtractorType.cssSelector;
  query: string;
  transform: ExtractorHtmlTransform;
}

export interface ExtractorConfigJson {
  type: ExtractorType.jsonSelector;
  query: string;
}
