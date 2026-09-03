export class INTERNAL_RovnaUILogger {
  static warning(messages: string[]) {
    console.warn(
      [
        '[RovnaUI]:',
        '\n',
        ...messages,
        '\n',
        'За более подробной информацией обратитесь в чат RovnaUI Support.',
      ].join('\n'),
    );
  }

  static error(messages: string[]) {
    console.error(
      [
        '[RovnaUI]:',
        '\n',
        ...messages,
        '\n',
        'За более подробной информацией обратитесь в чат RovnaUI Support.',
      ].join('\n'),
    );
  }
}
