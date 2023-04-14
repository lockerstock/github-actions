import parse from 'parse-duration';

export function parseDurationTimestamp(str: string): Date {
  const duration = parse(str, 's');

  const now = new Date();
  now.setSeconds(now.getSeconds() - duration);

  return now;
}
