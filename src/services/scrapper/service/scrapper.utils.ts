export const sanitizeScriptUri = (uri: string): string => {
  const [program, ...params] = uri.split(' ');
  const cmd = program.split(/[/\\]/).pop();
  return [cmd, ...params].join(' ');
};
