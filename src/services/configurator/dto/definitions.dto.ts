import { CollectorConfig } from 'src/shared/collector-config/type';

export interface CollectorDefinition {
  key: string;
  definition: CollectorConfig;
}

export type CollectorDefinitions = CollectorDefinition[];
