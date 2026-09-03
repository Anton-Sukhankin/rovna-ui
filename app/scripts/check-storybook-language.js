const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const packagesRoot = path.resolve(__dirname, '..', 'packages');
const repoRoot = path.resolve(__dirname, '..', '..');
const reportPath = path.join(repoRoot, 'docs', 'q08-static-language-report.json');
const allowlistPath = path.join(repoRoot, 'docs', 'storybook-language-allowlist.json');
const write = process.argv.includes('--write');
const storyPattern = /\.stories\.(?:js|jsx|ts|tsx)$/;
const userFacingFields = new Set([
  'cancelText',
  'children',
  'content',
  'description',
  'emptyText',
  'extra',
  'footer',
  'help',
  'label',
  'message',
  'okText',
  'options',
  'placeholder',
  'subtitle',
  'text',
  'title',
  'tooltip',
]);

const exactTranslations = new Map([
  ['Action', 'Действие'],
  ['Admin', 'Администратор'],
  ['Animal', 'Животное'],
  ['Bio', 'Описание'],
  ['Birth Date', 'Дата рождения'],
  ['Bottom', 'Снизу'],
  ['Button', 'Кнопка'],
  ['Cancel', 'Отмена'],
  ['Checkbox', 'Флажок'],
  ['Child', 'Элемент'],
  ['Click me', 'Нажмите'],
  ['Close', 'Закрыть'],
  ['Column', 'Столбец'],
  ['Columns settings', 'Настройки столбцов'],
  ['Confirm', 'Подтвердить'],
  ['Contactor', 'Контрагент'],
  ['Content', 'Содержимое'],
  ['Default', 'По умолчанию'],
  ['Description', 'Описание'],
  ['Design', 'Дизайн'],
  ['Display', 'Крупный заголовок'],
  ['Enter the name', 'Введите имя'],
  ['Enter the number', 'Введите номер'],
  ['Error', 'Ошибка'],
  ['Error message', 'Сообщение об ошибке'],
  ['Female', 'Женский'],
  ['First', 'Первый'],
  ['Header', 'Заголовок'],
  ['Heading', 'Заголовок'],
  ['Help message', 'Поясняющее сообщение'],
  ['Hover me', 'Наведите курсор'],
  ['Human', 'Человек'],
  ['Image', 'Изображение'],
  ['Imperative request', 'Выполнить запрос'],
  ['Info', 'Информация'],
  ['Is admin', 'Администратор'],
  ['Item', 'Элемент'],
  ['Job', 'Должность'],
  ['Left', 'Слева'],
  ['Link', 'Ссылка'],
  ['Link text', 'Текст ссылки'],
  ['LinkText', 'Текст ссылки'],
  ['Loading', 'Загрузка'],
  ['Male', 'Мужской'],
  ['Name', 'Название'],
  ['Neutral', 'Нейтральное'],
  ['Next', 'Далее'],
  ['No Description', 'Без описания'],
  ['Number', 'Номер'],
  ['Open', 'Открыть'],
  ['Okay', 'Подтвердить'],
  ['Password', 'Пароль'],
  ['Popover title', 'Заголовок'],
  ['Provider', 'Поставщик'],
  ['Radio', 'Радиокнопка'],
  ['Remount', 'Пересоздать'],
  ['Reset', 'Сбросить'],
  ['Right', 'Справа'],
  ['Salary', 'Зарплата'],
  ['Second', 'Второй'],
  ['Select the job', 'Выберите должность'],
  ['Sex', 'Пол'],
  ['Status', 'Статус'],
  ['Success', 'Успешно'],
  ['Summary', 'Итого'],
  ['Test', 'Тест'],
  ['Text', 'Текст'],
  ['Third', 'Третий'],
  ['Title', 'Заголовок'],
  ['Toggle', 'Переключатель'],
  ['Top', 'Сверху'],
  ['Wall', 'Стена'],
  ['Warning', 'Предупреждение'],
  ['With Footer', 'С действиями'],
  ['World', 'Описание'],
  ['bio', 'Описание'],
  ['job', 'Должность'],
  ['name', 'Название'],
  ['salary', 'Зарплата'],
  ['sex', 'Пол'],
  ['test', 'Тест'],
  ['zodiac', 'Знак зодиака'],
  ['I an apple, click me', 'Яблоко, нажмите'],
  ['I an banana, click me', 'Банан, нажмите'],
  ['I an grape, click me', 'Виноград, нажмите'],
  ['Padding Top', 'Верхний внутренний отступ'],
  ['Padding Right', 'Правый внутренний отступ'],
  ['Padding Bottom', 'Нижний внутренний отступ'],
  ['Padding Left', 'Левый внутренний отступ'],
  ['Margin Top', 'Верхний внешний отступ'],
  ['Margin Right', 'Правый внешний отступ'],
  ['Margin Bottom', 'Нижний внешний отступ'],
  ['Margin Left', 'Левый внешний отступ'],
]);

const sampleSentences = [
  'Это пример текста для проверки отображения компонента.',
  'Он помогает оценить перенос строк, отступы и доступную ширину содержимого.',
  'Все пользовательские подписи в основной русской локали должны быть понятными и последовательными.',
  'Длинный текст также позволяет проверить сокращение, переполнение и адаптивное поведение интерфейса.',
];

function sampleText(targetLength) {
  let result = '';
  let index = 0;
  while (result.length < Math.max(targetLength, 55)) {
    result += `${result ? ' ' : ''}${sampleSentences[index % sampleSentences.length]}`;
    index += 1;
  }
  return result;
}

function translate(text) {
  if (exactTranslations.has(text)) return exactTranslations.get(text);
  if (/^Lorem\b|^Lorem,/.test(text)) return sampleText(text.length);

  const numberedPatterns = [
    [/^Action (\d+)$/, 'Действие'],
    [/^Button (\d+)$/, 'Кнопка'],
    [/^Content (\d+)$/, 'Содержимое'],
    [/^Description (\d+)$/i, 'Описание'],
    [/^Display (\d+)$/, 'Крупный заголовок'],
    [/^Group (\d+)$/, 'Группа'],
    [/^Heading (\d+)$/, 'Заголовок'],
    [/^Item (\d+)$/, 'Пункт'],
    [/^Node (\d+)$/, 'Узел'],
    [/^Option (\d+)$/, 'Вариант'],
    [/^Title (\d+)$/, 'Заголовок'],
    [/^Test (\d+)$/, 'Тест'],
  ];

  for (const [pattern, replacement] of numberedPatterns) {
    const match = text.match(pattern);
    if (match) return `${replacement} ${match[1]}`;
  }

  const tooltip = text.match(/^Item (\d+) tooltip title$/);
  if (tooltip) return `Подсказка пункта ${tooltip[1]}`;

  return null;
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

function propertyName(node) {
  if (!node?.name) return null;
  if (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) return node.name.text;
  return null;
}

function arrayContainerField(node) {
  if (!ts.isArrayLiteralExpression(node.parent)) return null;

  const container = node.parent.parent;
  if (ts.isPropertyAssignment(container)) {
    let ancestor = container.parent;
    while (ancestor) {
      if (ts.isPropertyAssignment(ancestor) && propertyName(ancestor) === 'argTypes') {
        return null;
      }
      ancestor = ancestor.parent;
    }

    return propertyName(container);
  }
  if (ts.isVariableDeclaration(container) && ts.isIdentifier(container.name)) {
    return container.name.text;
  }
  if (ts.isJsxExpression(container) && ts.isJsxAttribute(container.parent)) {
    return propertyName(container.parent);
  }

  return null;
}

function isFeedbackArgument(node) {
  if (!ts.isCallExpression(node.parent) || node.parent.arguments[0] !== node) return false;
  const expression = node.parent.expression.getText();
  return /(?:message|notification|toast)\.(?:info|success|warning|error|open)$/.test(
    expression,
  );
}

function isTextFakerCall(node, sourceFile) {
  if (!ts.isCallExpression(node)) return false;
  return /^faker\.(?:animal|color|commerce|company|lorem|person|word)\./.test(
    node.expression.getText(sourceFile),
  );
}

function isAllowedTechnicalText(file, field, text) {
  if (!/[A-Za-z]{2}/.test(text) || /[А-Яа-яЁё]/.test(text)) return true;
  if (field === 'title' && (/[/()]/.test(text) || /^tend-ui/.test(text))) return true;
  if (/^https?:|^@|^[\w.+-]+@[\w.-]+$/.test(text)) return true;
  if (/^(?:S\.|col-|row-|iphone|all_projects|[A-Z]{2,}(?:,?\s+[A-Z]{2,})*)/.test(text)) return true;
  if (/^\(hook API\)$/.test(text)) return true;
  if (/^(?:toggle|col|Apple Touch|\/favicons\/|\d+x\d+ PNG)$/.test(text)) return true;
  return false;
}

const storyFiles = walk(packagesRoot).filter(file => storyPattern.test(file));
const findings = [];
let changedFiles = 0;
let replacementsCount = 0;

for (const file of storyFiles) {
  const source = fs.readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const replacements = [];

  const addReplacement = (node, text, next, field) => {
    const position = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
    if (!next && !isAllowedTechnicalText(file, field, text)) {
      findings.push({
        file: path.relative(packagesRoot, file),
        line: position.line + 1,
        field,
        text: text.replace(/\s+/g, ' ').slice(0, 160),
      });
      return;
    }
    if (next && next !== text) {
      replacements.push({
        start: node.getStart(sourceFile),
        end: node.getEnd(),
        text: JSON.stringify(next),
      });
    }
  };

  const visit = node => {
    if (
      ts.isCallExpression(node) &&
      ts.isJsxExpression(node.parent) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === 'toString' &&
      node.arguments.length === 0
    ) {
      const position = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
      findings.push({
        file: path.relative(packagesRoot, file),
        line: position.line + 1,
        field: 'raw-value-renderer',
        text: node.getText(sourceFile).slice(0, 160),
      });
    }

    if (
      ts.isArrowFunction(node) &&
      ts.isPropertyAssignment(node.parent) &&
      propertyName(node.parent) === 'render' &&
      /^\w+\.toString\(\)$/.test(node.body.getText(sourceFile))
    ) {
      const position = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
      findings.push({
        file: path.relative(packagesRoot, file),
        line: position.line + 1,
        field: 'raw-value-renderer',
        text: node.getText(sourceFile).slice(0, 160),
      });
    }

    if (isTextFakerCall(node, sourceFile)) {
      const position = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
      findings.push({
        file: path.relative(packagesRoot, file),
        line: position.line + 1,
        field: 'generated-user-facing-text',
        text: node.getText(sourceFile).slice(0, 160),
      });
    }

    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      let field = null;
      if (ts.isPropertyAssignment(node.parent)) field = propertyName(node.parent);
      if (ts.isJsxAttribute(node.parent)) field = propertyName(node.parent);
      if (!field) field = arrayContainerField(node);
      if (!field && ts.isJsxExpression(node.parent)) field = 'jsx';
      if (!field && isFeedbackArgument(node)) field = 'message';
      const next = translate(node.text);
      if (next || (field && userFacingFields.has(field))) {
        addReplacement(node, node.text, next, field || 'literal');
      }
    }

    if (ts.isJsxText(node)) {
      const text = node.text.trim();
      if (text) {
        const next = translate(text);
        if (next) {
          replacements.push({
            start: node.getStart(sourceFile),
            end: node.getEnd(),
            text: node.getText(sourceFile).replace(text, next),
          });
        } else if (!isAllowedTechnicalText(file, 'jsx', text)) {
          const position = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
          findings.push({
            file: path.relative(packagesRoot, file),
            line: position.line + 1,
            field: 'jsx',
            text: text.replace(/\s+/g, ' ').slice(0, 160),
          });
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  if (write && replacements.length) {
    let nextSource = source;
    for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
      nextSource =
        nextSource.slice(0, replacement.start) +
        replacement.text +
        nextSource.slice(replacement.end);
    }
    fs.writeFileSync(file, nextSource, 'utf8');
    changedFiles += 1;
    replacementsCount += replacements.length;
  } else if (!write) {
    for (const replacement of replacements) {
      const position = sourceFile.getLineAndCharacterOfPosition(replacement.start);
      findings.push({
        file: path.relative(packagesRoot, file),
        line: position.line + 1,
        field: 'known-English-label',
        text: source.slice(replacement.start, replacement.end).slice(0, 160),
      });
    }
  }
}

const report = {
  status: findings.length === 0 ? 'passed' : 'failed',
  mode: write ? 'write' : 'check',
  primaryLocale: 'ru',
  storyFiles: storyFiles.length,
  changedFiles,
  replacements: replacementsCount,
  unlocalizedUserFacingStrings: findings.length,
  allowlist: path.relative(repoRoot, allowlistPath).replace(/\\/g, '/'),
  fakerPolicy: {
    importsInStoryFiles: storyFiles.filter(file => /(?:from|require\()[^\n]*faker/.test(fs.readFileSync(file, 'utf8'))).length,
    status: storyFiles.some(file => /(?:from|require\()[^\n]*faker/.test(fs.readFileSync(file, 'utf8')))
      ? 'requires-seed-review'
      : 'not-used-fixed-fixtures',
  },
  findings,
};

console.log(JSON.stringify(report, null, 2));
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
if (!write && findings.length) process.exitCode = 1;
