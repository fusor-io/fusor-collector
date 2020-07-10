import { CollectorConfig } from 'src/shared/collector-config/type';

export interface CollectorDefinition {
  node: string;
  definition: CollectorConfig;
}

export type CollectorDefinitions = CollectorDefinition[];
