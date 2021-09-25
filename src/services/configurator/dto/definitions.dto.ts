import { CollectorConfig } from '../../../shared/type';

export interface CollectorDefinition {
  key: string;
  definition: CollectorConfig;
}

export type CollectorDefinitions = CollectorDefinition[];
