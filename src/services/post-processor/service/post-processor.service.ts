import { Injectable } from '@nestjs/common';
import {
  PostProcessorConfig,
  PostProcessorCommandType,
  ReplaceCommand,
  MatchCommand,
} from 'src/shared/collector-config/type';

@Injectable()
export class PostProcessorService {
  postProcess(postProcessingConfig: PostProcessorConfig, source: string): string {
    switch (postProcessingConfig.type) {
      case PostProcessorCommandType.replace:
        return this._replace(postProcessingConfig.command as ReplaceCommand, source);
      case PostProcessorCommandType.match:
        return this._match(postProcessingConfig.command as MatchCommand, source);
      default:
        return '';
    }
  }

  private _replace(command: ReplaceCommand, source: string): string {
    if (typeof command.from === 'string' && typeof command.to === 'string') {
      const regExp = new RegExp(command.from, command.flags || 'g');
      return source.replace(regExp, command.to);
    } else if (
      command.from &&
      command.to &&
      command.from instanceof Array &&
      command.to instanceof Array &&
      command.from.length === command.to.length
    ) {
      let result = source;
      for (let i = 0; i < command.from.length; i++) {
        const regExp = new RegExp(command.from[i], command.flags || 'g');
        result = result.replace(regExp, command.to[i]);
      }
      return result;
    } else {
      return source;
    }
  }

  private _match(command: MatchCommand, source: string): string {
    const regExp = new RegExp(command.pattern, command.flags || '');
    const result = regExp.exec(source) || [];
    const group = command.group || 0;
    return result.length > group ? result[group] : '';
  }
}
