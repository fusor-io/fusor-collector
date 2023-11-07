import { sanitizeScriptUri } from './scrapper.utils';

describe('scrapper.utils', () => {
  it('should be defined', () => {
    expect(sanitizeScriptUri('command')).toEqual('command');
    expect(sanitizeScriptUri('./command')).toEqual('command');
    expect(sanitizeScriptUri('/command')).toEqual('command');
    expect(sanitizeScriptUri('../path/a/b/command')).toEqual('command');
    expect(sanitizeScriptUri('/path/command')).toEqual('command');
    expect(sanitizeScriptUri('/path/command param1 param2')).toEqual('command param1 param2');
    expect(sanitizeScriptUri('/path/command param1=/abc/def param2=https://google.com/')).toEqual(
      'command param1=/abc/def param2=https://google.com/',
    );
  });
});
