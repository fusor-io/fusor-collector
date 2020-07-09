import { load } from 'cheerio';
import { Injectable, Logger } from '@nestjs/common';
import { ExtractorConfig, ExtractorType } from 'src/shared/collector-config/type';

@Injectable()
export class ExtractorService {
  private readonly _logger = new Logger(this.constructor.name);

  extract(extractor: ExtractorConfig, source: string): string {
    switch (extractor.type) {
      case ExtractorType.cssSelector:
        return this._extractByCssSelector(extractor.query, source);
      case ExtractorType.jsonSelector:
        return this._extractByJsonataQuery(extractor.query, source);
      default:
        return '';
    }
  }

  private _extractByCssSelector(selector: string, source: string): string {
    try {
      const $ = load(source);
      return $(selector).text();
    } catch (error) {
      this._logger.error(`Failed extracting using css selector ${selector}`, error);
      return '';
    }
  }

  private _extractByJsonataQuery(query: string, source: string): string {
    return source;
  }
}
