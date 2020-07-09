export enum PostProcessorCommandType {
  replace = 'replace',
  match = 'match',
}

export interface ReplaceCommand {
  from: string;
  to: string;
  flags?: string;
}

export interface MatchCommand {
  pattern: string;
  flags?: string;
}

export interface PostProcessorConfig {
  type: PostProcessorCommandType;
  command: ReplaceCommand | MatchCommand;
}
