export function getAction(subject: string, action: string): string {
  return subject.toLocaleLowerCase() + '.' + action;
}
