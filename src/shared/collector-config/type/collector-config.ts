import { SourceConfig } from './source-config';
import { PipesConfig } from './pipe-config';

export interface CollectorConfig {
  source: SourceConfig;
  pipes: PipesConfig;
}
