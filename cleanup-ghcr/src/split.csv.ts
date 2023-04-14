export function splitCSV(str: string): string[] {
  return str
    .split('\n')
    .map(tags => tags.split(','))
    .flat()
    .map(tag => tag.trim());
}
