import { RecurrenceSpecObjLit } from 'node-schedule';

import { BatchConfig } from './batch-config';
import { PipesConfig } from './pipe-config';
import { SourceConfig } from './source-config';

export interface CollectorConfig {
  batch?: BatchConfig;
  targetNode?: string;

  source: SourceConfig;
  schedule: string | RecurrenceSpecObjLit;
  pipes: PipesConfig;
}
