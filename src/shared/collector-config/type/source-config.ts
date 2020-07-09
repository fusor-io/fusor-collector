export enum SourceType {
  url = 'url',
  shell = 'shell',
}

export interface SourceConfig {
  type: SourceType;
  uri: string;
}
