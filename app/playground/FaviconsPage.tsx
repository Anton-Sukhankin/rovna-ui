import React, { useState } from 'react';

import { FaviconProvider, FaviconType } from '@rovna-ui/favicons';

const availableFavicons: Array<{ type: FaviconType; name: string; description: string }> =
  [
    { type: 'ks-manager-10D', name: 'KS Manager', description: 'Система управления KS' },
    {
      type: 'lk-10D',
      name: 'Личный кабинет',
      description: 'Личный кабинет пользователя',
    },
    { type: 'materials-10D', name: 'Materials', description: 'Управление материалами' },
    { type: 'pass-10D', name: 'Pass10D', description: 'Система Pass' },
    { type: 'pass-gdrs-10D', name: 'Pass GDRS', description: 'Система Pass GDRS' },
    { type: 'plan-10D', name: 'Plan', description: 'Планирование' },
    { type: 'pro-10D', name: 'Pro', description: 'Профессиональная версия' },
    { type: 'quality-10D', name: 'Quality', description: 'Управление качеством' },
    { type: 'reports-10D', name: 'Reports', description: 'Отчетность' },
    { type: 'rmp-10D', name: 'RMP', description: 'Система RMP' },
    { type: 'sod-10D', name: 'SOD', description: 'Система SOD' },
    { type: 'tender-10D', name: 'Tender', description: 'Тендерная система' },
  ];

const FaviconsPage: React.FC = () => {
  const [selectedFavicon, setSelectedFavicon] = useState<FaviconType>('ks-manager-10D');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>
        Пример использования FaviconProvider
      </h1>

      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h2 style={{ color: '#666', marginBottom: '10px' }}>
          Автоматическое подключение favicons
        </h2>
        <p style={{ color: '#888', lineHeight: '1.5' }}>
          Компонент <code>FaviconProvider</code> автоматически подключает все форматы
          favicons:
        </p>
        <ul style={{ color: '#888', lineHeight: '1.5' }}>
          <li>SVG - для современных браузеров</li>
          <li>ICO - для старых браузеров и IE</li>
          <li>PNG - размеры 16x16, 32x32, 48x48</li>
          <li>Apple Touch Icon - 180x180 для iOS</li>
        </ul>
      </div>

      <div
        style={{
          backgroundColor: '#e8f5e8',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #4caf50',
          marginBottom: '20px',
        }}
      >
        <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>
          Выберите favicon для демонстрации:
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '10px',
          }}
        >
          {availableFavicons.map(favicon => (
            <div
              key={favicon.type}
              style={{
                padding: '10px',
                border:
                  selectedFavicon === favicon.type
                    ? '2px solid #4caf50'
                    : '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: selectedFavicon === favicon.type ? '#f0f8f0' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onClick={() => setSelectedFavicon(favicon.type)}
            >
              <div style={{ fontWeight: 'bold', color: '#333' }}>{favicon.name}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{favicon.description}</div>
              <div style={{ fontSize: '10px', color: '#999', fontFamily: 'monospace' }}>
                {favicon.type}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#fff3cd',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #ffeaa7',
        }}
      >
        <h3 style={{ color: '#856404', marginBottom: '10px' }}>
          Текущий favicon: {availableFavicons.find(f => f.type === selectedFavicon)?.name}
        </h3>
        <p style={{ color: '#856404', margin: '0' }}>
          Проверьте вкладку браузера - там должен отображаться favicon выбранного сервиса
        </p>
      </div>

      {/* FaviconProvider подключает все форматы автоматически */}
      <FaviconProvider type={selectedFavicon} />
    </div>
  );
};

export { FaviconsPage };
