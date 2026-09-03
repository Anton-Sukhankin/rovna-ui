export const setHtml = (container: HTMLDivElement, text: string) => {
  text = text.replace(/\\"/g, '"');

  const patterns: { regex: RegExp; replacement: string }[] = [
    { regex: /^# (.*?)$/gm, replacement: '<h1>$1</h1>' },
    { regex: /^## (.*?)$/gm, replacement: '<h2>$1</h2>' },
    { regex: /^> (.*?)$/gm, replacement: '<blockquote>$1</blockquote>' },
    { regex: /\*\*\*(.*?)\*\*\*/g, replacement: '<b><i>$1</i></b>' }, // ***bold italic***
    { regex: /___(.*?)___/g, replacement: '<b><i>$1</i></b>' }, // ___bold italic___
    { regex: /\*\*(.*?)\*\*/g, replacement: '<b>$1</b>' }, // **bold**
    { regex: /__(.*?)__/g, replacement: '<i>$1</i>' }, // __italic__
    { regex: /\*(.*?)\*/g, replacement: '<i>$1</i>' }, // *italic*
    { regex: /_(.*?)_/g, replacement: '<i>$1</i>' }, // _italic_
    { regex: /~~(.*?)~~/g, replacement: '<s>$1</s>' }, // ~~strikethrough~~
    { regex: /`(.*?)`/g, replacement: '<code>$1</code>' }, // `inline code`
    { regex: /\[(.*?)\]\((.*?)\)/g, replacement: '<a href="$2">$1</a>' }, // [link](url)
  ];

  patterns.forEach(pattern => {
    text = text.replace(pattern.regex, pattern.replacement);
  });

  container.innerHTML = text;
};

export const formatTime = (date: number | string) =>
  new Date(date).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
