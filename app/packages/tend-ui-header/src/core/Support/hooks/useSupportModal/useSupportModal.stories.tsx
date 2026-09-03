import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@rovna-ui/primitives';
import { Text } from '@rovna-ui/typography';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { useSupportModal } from './useSupportModal';
import { Support } from '../../Support';

// Универсальный компонент для демонстрации всех возможностей
const UseSupportModalDemo: React.FC = () => {
  const { openSupport, closeSupport, toggleSupport, isOpen } = useSupportModal();

  // Минимальные параметры для модалки поддержки
  const supportProps = {
    moduleOptions: [
      { value: 'demo', label: 'Демо модуль' },
      { value: "Тест", label: 'Тестовый модуль' },
    ],
    module: 'demo',
    fio: 'Демо пользователь',
    email: 'demo@example.com',
    alertText: '💡 Это демо модалка поддержки для показа работы useSupportModal',
    onSend: async (state: unknown) => {
      console.log('Отправка поддержки:', state);
      // Симуляция отправки
      await new Promise(resolve => setTimeout(resolve, 5000));
    },
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>Демонстрация useSupportModal</h2>

      <div style={{ marginBottom: '20px' }}>
        <Text style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
          Статус модалки: {isOpen ? '🟢 Открыта' : '🔴 Закрыта'}
        </Text>
      </div>

      <div
        style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}
      >
        <Button onClick={openSupport} variant='primary'>
          Открыть поддержку
        </Button>
        <Button onClick={closeSupport} variant='secondary'>
          Закрыть поддержку
        </Button>
        <Button onClick={toggleSupport} variant='ghost'>
          Переключить ({isOpen ? 'закрыть' : 'открыть'})
        </Button>
      </div>

      <div
        style={{
          padding: '15px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Text style={{ fontWeight: 'bold', marginBottom: '10px' }}>
          Информация о хуке:
        </Text>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Глобальное состояние - работает во всем приложении</li>
          <li>Singleton паттерн - только одна модалка одновременно</li>
          <li>Автоматическая синхронизация - все компоненты обновляются</li>
          <li>Производительность - минимальные ререндеры</li>
        </ul>
      </div>

      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          border: '1px dashed #999',
          borderRadius: '4px',
          backgroundColor: '#fff',
        }}
      >
        <Text style={{ fontSize: '12px', color: '#666' }}>
          💡 Попробуйте открыть модалку кнопкой выше и заполните форму. Модалка
          автоматически использует глобальное состояние из useSupportModal.
        </Text>
      </div>

      {/* В header белая кнопка поддержки всегда находится на акцентном фоне. */}
      <div style={{ backgroundColor: '#0057b8', padding: '8px', width: 'fit-content' }}>
        <Support {...supportProps} />
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'Rovna UI/Header/hooks/useSupportModal',
  component: UseSupportModalDemo,
  parameters: {
    docs: {
      description: {
        component:
          'Хук для глобального управления модалкой поддержки. Демонстрирует работу с реальной модалкой.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <UseSupportModalDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Открыть поддержку' }));
    const dialog = await page.findByRole('dialog');
    await expect(dialog).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Закрыть поддержку' }));
    await waitFor(() => expect(dialog).not.toBeVisible(), { timeout: 5_000 });
  },
};
