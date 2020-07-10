import { SourceConfig } from './source-config';
import { PipesConfig } from './pipe-config';
import { RecurrenceSpecObjLit } from 'node-schedule';

export interface CollectorConfig {
  source: SourceConfig;
  schedule: string | RecurrenceSpecObjLit;
  pipes: PipesConfig;
}
