export function injectMarkdownText(
  title: string,
  message: string,
  injectText: string
): string {
  if (hasBlockComments(title, message)) {
    return replaceInjectedText(title, message, injectText);
  }

  return appendText(title, message, injectText);
}

export function hasBlockComments(title: string, message: string): boolean {
  return (
    message.includes(startComment(title)) && message.includes(endComment(title))
  );
}

export function replaceInjectedText(
  title: string,
  message: string,
  injectText: string
): string {
  return `${preStartCommentText(title, message)}${startComment(
    title
  )}\n${injectText}\n${endComment(title)}${postEndCommentText(title, message)}`;
}

export function preStartCommentText(title: string, message: string): string {
  return message.split(startComment(title))[0];
}

export function postEndCommentText(title: string, message: string): string {
  const parts = message.split(endComment(title));

  if (parts.length > 0) {
    parts.shift();
    return parts.join('');
  }
  return '';
}

export function appendText(
  title: string,
  message: string,
  injectText: string
): string {
  return `${message}\n\n${startComment(title)}\n${injectText}\n${endComment(
    title
  )}`;
}

export function startComment(title: string): string {
  return `<!-- START (lockerstock/github-actions/add-release-notes) ${title} -->`;
}

export function endComment(title: string): string {
  return `<!-- END (lockerstock/github-actions/add-release-notes) ${title} -->`;
}
