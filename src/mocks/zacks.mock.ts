import { CollectorConfig, SourceType, ExtractorType, PostProcessorCommandType } from 'src/shared/collector-config/type';

export const TESLA_STOCKS_CONFIG: CollectorConfig = {
  source: {
    type: SourceType.url,
    uri: 'https://www.zacks.com/stock/quote/tsla',
  },
  pipes: {
    tsla_rank: {
      extract: {
        type: ExtractorType.cssSelector,
        query: '.zr_rankbox .rank_view',
      },
      postProcess: [
        {
          type: PostProcessorCommandType.replace,
          command: { from: '\\D', to: '', flags: 'gi' },
        },
        {
          type: PostProcessorCommandType.match,
          command: { pattern: '^(\\d)' },
        },
      ],
    },
  },
};
