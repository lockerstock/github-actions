import 'mocha';
import {expect} from 'chai';
import {
  endComment,
  injectMarkdownText,
  startComment
} from '../src/inject-markdown-text';

describe('injectMarkdownText', () => {
  const title = 'Test';
  const message = 'Original Body';
  const injectText = 'Appended Notes';
  const finalBody = `${message}

${startComment(title)}
${injectText}
${endComment(title)}`;

  it('appends text to end', () => {
    expect(injectMarkdownText(title, message, injectText)).equal(finalBody);
  });
  it('replaces existing text', () => {
    const existingMessage = `${message}

${startComment(title)}
Previous Release Notes
${endComment(title)}`;
    expect(injectMarkdownText(title, existingMessage, injectText)).equal(
      finalBody
    );
  });
});
