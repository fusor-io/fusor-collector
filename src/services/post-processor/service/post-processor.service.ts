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
    const regExp = new RegExp(command.from, command.flags || 'g');
    return source.replace(regExp, command.to);
  }

  private _match(command: MatchCommand, source: string): string {
    const regExp = new RegExp(command.pattern, command.flags || '');
    const result = regExp.exec(source);
    return result.length > 0 ? result[0] : '';
  }
}
