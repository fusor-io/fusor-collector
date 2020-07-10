export enum PostProcessorCommandType {
  replace = 'replace',
  match = 'match',
}

export interface ReplaceCommand {
  from: string | string[];
  to: string | string[];
  flags?: string;
}

export interface MatchCommand {
  pattern: string;
  flags?: string;
  group?: number;
}

export interface PostProcessorConfig {
  type: PostProcessorCommandType;
  command: ReplaceCommand | MatchCommand;
}
