export interface ErrorMessage {
  message: string;
  stack: Array<{
    line: number;
    column: number;
    filename: string;
  }>;
}
interface stackInfo {
  line: number;
  column: number;
  filename: string;
}
function extractStack(stack: string): Array<stackInfo> {
  const res: Array<stackInfo> = [];
  // Chrome
  const reg = /https{0,1}.*[.js].*:[0-9]*:[0-9]*/g;
  const match = stack.match(reg);
  match?.forEach((str) => {
    const error: stackInfo = {
      line: 0,
      column: 0,
      filename: '',
    };
    const split = str.split(':');
    if (split.length === 5) {
      error.filename = `${split[0]}:${split[1]}:${split[2]}`;
      error.line = parseInt(split[3], 10);
      error.column = parseInt(split[4], 10);
      res.push(error);
    }
  });
  return res;
}
export function parseError(err: Error): ErrorMessage {
  const { stack, message } = err;
  const res: ErrorMessage = {
    message,
    stack: [],
  };
  if (!stack) {
    return res;
  }
  if (stack.indexOf('Error') > -1) {
    // Chrome
    res.message = stack.split('\n')[0].split(':')[1].trim();
  }
  res.stack = extractStack(stack);
  return res;
}
