console.log('🚀 Начинаем сборку tend-ui-assets...\n');

// Копируем структуру папок
require('./copy-structure');

// Генерируем логотипы
require('./generate-logos');

// Генерируем изображения
require('./generate-images');

// Копируем шрифты
require('./copy-fonts');

// Копируем changelog
require('./copy-changelog');

// Генерируем favicons
require('./generate-favicons');

console.log('\n✅ Сборка tend-ui-assets завершена!');
