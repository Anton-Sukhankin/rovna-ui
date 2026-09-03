import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { FaviconProvider } from './FaviconProvider';
import { FaviconType } from '../types';

const meta: Meta<typeof FaviconProvider> = {
  title: 'Rovna UI/Favicons/FaviconProvider',
  component: FaviconProvider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Компонент для управления favicon в приложении. Позволяет динамически изменять favicon в зависимости от типа сервиса.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'ks-manager-10D',
        'lk-10D',
        'smaterials',
        'materials-10D',
        'pass-10D',
        'pass-gdrs-10D',
        'plan-10D',
        'pro-10D',
        'quality-10D',
        'reports-10D',
        'rmp-10D',
        'sblueprint',
        'sod-10D',
        'tender-10D',
      ],
      description: 'Тип favicon для отображения',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Компонент для демонстрации favicon в интерфейсе
const FaviconDemo: React.FC<{ type: FaviconType }> = ({ type }) => {
  const getFaviconUrl = (
    faviconType: FaviconType,
    format?: string,
    size?: number,
  ): string => {
    const baseUrl = `/favicons`;

    if (format === 'ico') {
      return `${baseUrl}/${faviconType}.ico`;
    }
    if (format === 'svg') {
      return `${baseUrl}/${faviconType}.svg`;
    }
    if (format === 'apple-touch') {
      return `${baseUrl}/${faviconType}-apple-touch.png`;
    }

    return `${baseUrl}/${faviconType}-${size || 32}.png`;
  };

  // Генерируем HTML код, который вставляет компонент
  const generateHtmlCode = (faviconType: FaviconType): string => {
    return `<!-- Автоматически генерируемый HTML код для ${faviconType} -->
<link rel="icon" type="image/svg+xml" href="${getFaviconUrl(faviconType, 'svg')}" />
<link rel="icon" type="image/x-icon" href="${getFaviconUrl(faviconType, 'ico')}" />
<link rel="icon" type="image/png" sizes="16x16" href="${getFaviconUrl(
      faviconType,
      undefined,
      16,
    )}" />
<link rel="icon" type="image/png" sizes="32x32" href="${getFaviconUrl(
      faviconType,
      undefined,
      32,
    )}" />
<link rel="icon" type="image/png" sizes="48x48" href="${getFaviconUrl(
      faviconType,
      undefined,
      48,
    )}" />
<link rel="apple-touch-icon" sizes="180x180" href="${getFaviconUrl(
      faviconType,
      'apple-touch',
    )}" />
<link rel="shortcut icon" href="${getFaviconUrl(faviconType, 'ico')}" />`;
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', maxWidth: '800px' }}>
      <FaviconProvider type={type} />

      <div style={{ marginBottom: '30px' }}>
        <h3>Текущий favicon: {type}</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Favicon установлен в вкладке браузера
        </p>
      </div>

      {/* Все форматы favicon */}
      <div style={{ marginBottom: '30px' }}>
        <h4>Все генерируемые форматы favicon:</h4>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '15px',
            marginTop: '15px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h5>SVG</h5>
            <img
              src={getFaviconUrl(type, 'svg')}
              alt={`${type} SVG favicon`}
              style={{
                width: '32px',
                height: '32px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '4px',
                background: 'white',
              }}
            />
            <p style={{ fontSize: '11px', margin: '5px 0 0 0', color: '#666' }}>
              {getFaviconUrl(type, 'svg').split('/').pop()}
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h5>ICO</h5>
            <img
              src={getFaviconUrl(type, 'ico')}
              alt={`${type} ICO favicon`}
              style={{
                width: '32px',
                height: '32px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '4px',
                background: 'white',
              }}
            />
            <p style={{ fontSize: '11px', margin: '5px 0 0 0', color: '#666' }}>
              {getFaviconUrl(type, 'ico').split('/').pop()}
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h5>16x16 PNG</h5>
            <img
              src={getFaviconUrl(type, undefined, 16)}
              alt={`${type} 16x16 PNG favicon`}
              style={{
                width: '32px',
                height: '32px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '4px',
                background: 'white',
                imageRendering: 'pixelated',
              }}
            />
            <p style={{ fontSize: '11px', margin: '5px 0 0 0', color: '#666' }}>
              {getFaviconUrl(type, undefined, 16).split('/').pop()}
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h5>32x32 PNG</h5>
            <img
              src={getFaviconUrl(type, undefined, 32)}
              alt={`${type} 32x32 PNG favicon`}
              style={{
                width: '32px',
                height: '32px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '4px',
                background: 'white',
              }}
            />
            <p style={{ fontSize: '11px', margin: '5px 0 0 0', color: '#666' }}>
              {getFaviconUrl(type, undefined, 32).split('/').pop()}
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h5>48x48 PNG</h5>
            <img
              src={getFaviconUrl(type, undefined, 48)}
              alt={`${type} 48x48 PNG favicon`}
              style={{
                width: '48px',
                height: '48px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '4px',
                background: 'white',
              }}
            />
            <p style={{ fontSize: '11px', margin: '5px 0 0 0', color: '#666' }}>
              {getFaviconUrl(type, undefined, 48).split('/').pop()}
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h5>Apple Touch</h5>
            <img
              src={getFaviconUrl(type, 'apple-touch')}
              alt={`${type} Apple Touch favicon`}
              style={{
                width: '60px',
                height: '60px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '4px',
                background: 'white',
              }}
            />
            <p style={{ fontSize: '11px', margin: '5px 0 0 0', color: '#666' }}>
              {getFaviconUrl(type, 'apple-touch').split('/').pop()}
            </p>
          </div>
        </div>
      </div>

      {/* Генерируемый HTML код */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Генерируемый HTML код:</h4>
        <pre
          style={{
            background: '#f8f9fa',
            padding: '15px',
            borderRadius: '8px',
            fontSize: '12px',
            fontFamily: 'monospace',
            textAlign: 'left',
            overflow: 'auto',
            border: '1px solid #e9ecef',
          }}
        >
          {generateHtmlCode(type)}
        </pre>
      </div>

      {/* URL для справки */}
      <div
        style={{
          padding: '15px',
          background: '#e8f4fd',
          borderRadius: '8px',
          fontSize: '12px',
          fontFamily: 'monospace',
          border: '1px solid #bee5eb',
        }}
      >
        <strong>Базовый URL:</strong> /favicons/
      </div>
    </div>
  );
};

// Основная история с контролами
export const Default: Story = {
  render: args => <FaviconDemo type={args.type} />,
  args: {
    type: 'lk-10D',
  },
};

export const KSManager10D: Story = {
  render: args => <FaviconDemo type={args.type} />,
  args: {
    type: 'ks-manager-10D',
  },
  parameters: {
    docs: {
      description: {
        story: 'Favicon для сервиса KS Manager 10D',
      },
    },
  },
};

export const LK10D: Story = {
  render: args => <FaviconDemo type={args.type} />,
  args: {
    type: 'lk-10D',
  },
  parameters: {
    docs: {
      description: {
        story: 'Favicon для сервиса ЛК 10D',
      },
    },
  },
};

export const SMaterials: Story = {
  render: args => <FaviconDemo type={args.type} />,
  args: {
    type: 'smaterials',
  },
  parameters: {
    docs: {
      description: {
        story: 'Favicon для сервиса SMaterials',
      },
    },
  },
};

export const Materials10D: Story = {
  render: args => <FaviconDemo type={args.type} />,
  args: {
    type: 'materials-10D',
  },
  parameters: {
    docs: {
      description: {
        story: 'Favicon для сервиса Материалы 10D',
      },
    },
  },
};

export const Pass10D: Story = {
  render: args => <FaviconDemo type={args.type} />,
  args: {
    type: 'pass-10D',
  },
  parameters: {
    docs: {
      description: {
        story: 'Favicon для сервиса Паспорт 10D',
      },
    },
  },
};

export const PassGDRS10D: Story = {
  render: args => <FaviconDemo type={args.type} />,
  args: {
    type: 'pass-gdrs-10D',
  },
  parameters: {
    docs: {
      description: {
        story: 'Favicon для сервиса Паспорт ГДРС 10D',
      },
    },
  },
};

export const Plan10D: Story = {
  render: args => <FaviconDemo type={args.type} />,
  args: {
    type: 'plan-10D',
  },
  parameters: {
    docs: {
      description: {
        story: 'Favicon для сервиса План 10D',
      },
    },
  },
};

export const Pro10D: Story = {
  render: args => <FaviconDemo type={args.type} />,
  args: {
    type: 'pro-10D',
  },
  parameters: {
    docs: {
      description: {
        story: 'Favicon для сервиса PRO 10D',
      },
    },
  },
};

export const Quality10D: Story = {
  render: args => <FaviconDemo type={args.type} />,
  args: {
    type: 'quality-10D',
  },
  parameters: {
    docs: {
      description: {
        story: 'Favicon для сервиса Качество 10D',
      },
    },
  },
};

export const Reports10D: Story = {
  render: args => <FaviconDemo type={args.type} />,
  args: {
    type: 'reports-10D',
  },
  parameters: {
    docs: {
      description: {
        story: 'Favicon для сервиса Отчеты 10D',
      },
    },
  },
};

export const RMP10D: Story = {
  render: args => <FaviconDemo type={args.type} />,
  args: {
    type: 'rmp-10D',
  },
  parameters: {
    docs: {
      description: {
        story: 'Favicon для сервиса РМП 10D',
      },
    },
  },
};

export const SBlueprint: Story = {
  render: args => <FaviconDemo type={args.type} />,
  args: {
    type: 'sblueprint',
  },
  parameters: {
    docs: {
      description: {
        story: 'Favicon для сервиса SBlueprint',
      },
    },
  },
};

export const SOD10D: Story = {
  render: args => <FaviconDemo type={args.type} />,
  args: {
    type: 'sod-10D',
  },
  parameters: {
    docs: {
      description: {
        story: 'Favicon для сервиса СОД 10D',
      },
    },
  },
};

export const Tender10D: Story = {
  render: args => <FaviconDemo type={args.type} />,
  args: {
    type: 'tender-10D',
  },
  parameters: {
    docs: {
      description: {
        story: 'Favicon для сервиса Тендер 10D',
      },
    },
  },
};

// Интерактивная история для демонстрации всех типов
export const AllTypes: Story = {
  render: () => {
    const faviconTypes: FaviconType[] = [
      'ks-manager-10D',
      'lk-10D',
      'materials-10D',
      'pass-10D',
      'pass-gdrs-10D',
      'plan-10D',
      'pro-10D',
      'quality-10D',
      'reports-10D',
      'rmp-10D',
      'sblueprint',
      'smaterials',
      'sod-10D',
      'tender-10D',
    ];

    const getFaviconUrl = (faviconType: FaviconType): string => {
      return `/favicons/${faviconType}.svg`;
    };

    return (
      <div style={{ padding: '20px' }}>
        <h2>Все доступные типы favicons</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Нажмите на любой favicon, чтобы увидеть его в полном размере
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          {faviconTypes.map(type => (
            <div
              key={type}
              style={{
                textAlign: 'center',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                background: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onClick={() => {
                action('Favicon preview requested')(getFaviconUrl(type));
              }}
            >
              <img
                src={getFaviconUrl(type)}
                alt={`${type} favicon`}
                style={{
                  width: '48px',
                  height: '48px',
                  marginBottom: '10px',
                }}
              />
              <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>{type}</p>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрация всех доступных типов favicons. Кликните на любой favicon для просмотра в полном размере.',
      },
    },
  },
};
