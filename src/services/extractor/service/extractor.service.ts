import { Injectable, Logger } from '@nestjs/common';
import { load } from 'cheerio';
import { fromString } from 'html-to-text';
import * as jsonata from 'jsonata';
import { ExtractorConfig, ExtractorHtmlTransform, ExtractorType } from 'src/shared/collector-config/type';

@Injectable()
export class ExtractorService {
  private readonly _logger = new Logger(this.constructor.name);

  extract(extractor: ExtractorConfig, source: string): string | number {
    switch (extractor.type) {
      case ExtractorType.cssSelector:
        return this._extractByCssSelector(extractor.query, extractor.transform, source);
      case ExtractorType.jsonSelector:
        return this._extractByJsonataQuery(extractor.query, source);
      default:
        return '';
    }
  }

  private _extractByCssSelector(selector: string, transform: ExtractorHtmlTransform, source: string): string {
    try {
      const $ = load(source);
      switch (transform) {
        case ExtractorHtmlTransform.html2Text: {
          const html = $(selector).html();
          const text = fromString(html, {
            tables: true,
            wordwrap: false,
            ignoreImage: true,
            ignoreHref: true,
            preserveNewlines: true,
            uppercaseHeadings: false,
            singleNewLineParagraphs: true,
          });
          return text;
        }
        case ExtractorHtmlTransform.rawHtml: {
          return $(selector).html();
        }
        default: {
          return $(selector).text();
        }
      }
    } catch (error) {
      this._logger.error(`Failed extracting using css selector ${selector}`, error);
      return '';
    }
  }

  private _extractByJsonataQuery(query: string, source: string | object): string | number {
    try {
      const data = typeof source === 'string' ? JSON.parse(source) : source;

      const expression = jsonata(query);
      const result = expression.evaluate(data);

      if (typeof result === 'string' || typeof result === 'number') return result;

      throw new Error(`Query evaluated to invalid data type: ${typeof result}`);
    } catch (error) {
      this._logger.error('Failed executing JSONata query', error);
      return '';
    }
  }
}
