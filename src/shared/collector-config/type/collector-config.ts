import { SourceConfig } from './source-config';
import { PipesConfig } from './pipe-config';
import { RecurrenceSpecObjLit } from 'node-schedule';

export interface CollectorConfig {
  id: string;
  source: SourceConfig;
  schedule: string | RecurrenceSpecObjLit;
  pipes: PipesConfig;
}
