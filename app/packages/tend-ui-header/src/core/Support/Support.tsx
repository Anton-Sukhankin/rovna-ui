import { Form, useForm } from '@rovna-ui/form';
import { useTranslation } from '@rovna-ui/locale/hooks/useTranslation';
import { useColors } from '@rovna-ui/theme';
import { Button, Drawer, Input } from '@rovna-ui/primitives';
import { Text, Title } from '@rovna-ui/typography';
import { Attachment, UploadButton } from '@rovna-ui/upload';
import { Alert, Select, TextArea, Toast } from '@rovna-ui/components/primitives';
import React from 'react';

import { useSupportModal } from './hooks';
import { FilesFormFieldWrapper } from './styled';
import { FormState, SupportProps } from './types';

const buttonStyle = { padding: '8px', fontSize: '12px' };
const alertTextStyle = { whiteSpace: 'pre-line', marginBottom: '24px' };
const alertVersionStyle = { whiteSpace: 'pre-line', marginBottom: '12px' };

const criticality = {
  consultation: {
    label: 'Консультация',
    description: 'Вопрос о работе продукта',
  },
  low: {
    label: 'Низкая',
    description: 'Небольшие проблемы',
  },
  medium: {
    label: 'Средняя',
    description: 'Негативное влияние на работу',
  },
  high: {
    label: 'Высокая',
    description: 'Критичная проблема, остановка работы',
  },
};
const criticalitySelectOptions = Object.values(criticality).map(item => ({
  label: item.label,
  value: item.label,
}));

export const Support = ({
  onSend,
  alertText,
  moduleOptions,
  module = window.location.hostname,
  fio,
  email,
  maxFileSize = 20 * 1024 * 1024,
  version,
}: SupportProps) => {
  const t = useTranslation();
  const colors = useColors();
  const fileSize = maxFileSize / (1024 * 1024);

  const wrapperRef = React.useRef(null);

  // Используем глобальное состояние модалки
  const { isOpen, openSupport, closeSupport } = useSupportModal();
  const [isLoading, setIsLoading] = React.useState(false);

  const onClick = React.useCallback(() => {
    openSupport();
  }, [openSupport]);

  const onClose = React.useCallback(() => {
    // Защита от закрытия во время отправки
    if (isLoading) return;

    closeSupport();
  }, [closeSupport, isLoading]);

  const unstableStyling = React.useMemo(() => {
    return {
      buttonOnAccent: { ghostDefaultText: colors.gray0 },
    };
  }, [colors]);

  const labelVersionStyle = React.useMemo(
    () => ({
      color: colors.gray500,
    }),
    [colors],
  );

  const defaultValues = {
    module,
    fio,
    email,
    ...(version && { version }),
  } as FormState;

  const form = useForm<FormState>({
    defaultValues,
    onSubmit: (state: FormState) => {
      // Защита от повторной отправки
      if (isLoading) return;

      setIsLoading(true);
      onSend?.(state)
        .then(() => {
          onClose();

          setTimeout(() => {
            form.resetFields();
            form.setFields(defaultValues);
          }, 500);
        })
        .catch(() => {
          Toast.error({
            message: 'Ошибка при обращении к сервису',
            description: 'Попробуйте подождать и повторить действие еще раз',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const onSubmit = React.useCallback(() => {
    form.submit().catch(() => {
      if (wrapperRef.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const errorElement = wrapperRef.current.querySelector(
          '.rovna-ui-form-field-root-has-error',
        );

        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }, [form]);

  const footer = React.useMemo(() => {
    return [
      <Button
        key='cancelButton'
        variant='secondary'
        onClick={onClose}
        disabled={isLoading}
      >
        Отмена
      </Button>,
      <Button key='sendButton' onClick={onSubmit} loading={isLoading}>
        Отправить
      </Button>,
    ];
  }, [onClose, onSubmit, isLoading]);

  return (
    <>
      <Button
        type='button'
        // FIXME: Перевести на styling API
        style={buttonStyle}
        variant='ghost'
        preset='accent'
        UNSTABLE_styling={unstableStyling}
        onClick={onClick}
      >
        {t(['widgets', 'Layout', 'Header', 'info'])}
      </Button>
      <Drawer open={isOpen} title='Помощь' footer={footer} onClose={onClose} width={400}>
        {alertText && (
          <Alert
            style={alertTextStyle}
            type='info'
            description={alertText}
            showIcon={false}
          />
        )}
        <Title level='h6' mt={0} mb={16}>
          Детали проблемы
        </Title>
        <div ref={wrapperRef}>
          <Form form={form}>
            <Form.Field
              label='Модуль'
              name='module'
              rules={[
                {
                  message: 'Поле обязательно для заполнения',
                  required: true,
                },
              ]}
            >
              <Select options={moduleOptions} placeholder='Выберите модуль' fullWidth />
            </Form.Field>
            <Form.Field
              label='Критичность'
              name='criticality'
              rules={[
                {
                  message: 'Поле обязательно для заполнения',
                  required: true,
                },
              ]}
            >
              <Select
                options={criticalitySelectOptions}
                placeholder='Выберите критичность'
                fullWidth
              />
            </Form.Field>
            <Form.Field
              label='Заголовок'
              name='title'
              rules={[
                {
                  message: 'Поле обязательно для заполнения',
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Field>
            <Form.Field label='Описание проблемы' name='description'>
              <TextArea placeholder='Введите комментарий' />
            </Form.Field>
            <Text color={'gray500'} size='small' mt={-10}>
              Подробно опишите, что именно произошло, с какой ошибкой столкнулись и что
              делали до ее возникновения
            </Text>
            <Title level='h6' mt={8} mb={0}>
              Контакты для связи
            </Title>
            <Form.Field
              label='ФИО'
              name='fio'
              rules={[
                {
                  message: 'Поле обязательно для заполнения',
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Field>
            <Form.Field
              label='Роль в компании'
              name='role'
              rules={[
                {
                  message: 'Поле обязательно для заполнения',
                  required: true,
                },
              ]}
            >
              <Input placeholder='Например, директор по строительству' />
            </Form.Field>
            <Form.Field
              label='Почта'
              name='email'
              rules={[
                {
                  message: 'Поле обязательно для заполнения',
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Field>
            <Form.Field label='Телефон' name='phone'>
              <Input />
            </Form.Field>
            <Title level='h6' mt={8} mb={0}>
              Файлы
            </Title>
            <Text size='medium' mt={-10}>
              Прикрепите снимки, видео или логи, которые помогут понять проблему
            </Text>
            <Text size='small' color={'gray500'} mt={-8}>
              {`Максимальный размер файла — ${fileSize} Мб`}
            </Text>
            <FilesFormFieldWrapper>
              <Form.Field
                name='files'
                rules={[
                  {
                    validator: (files: Attachment[]) => {
                      if (!files || files.length === 0) {
                        return Promise.resolve();
                      }

                      const rejectedFiles = files.filter(
                        item => item.file && item.file.size > maxFileSize,
                      );
                      const rejectedFileNames = rejectedFiles.map(file => file.name);

                      if (rejectedFiles.length > 0) {
                        form.setField(
                          'files',
                          files.map(file => {
                            if (rejectedFileNames.includes(file.name)) {
                              return {
                                ...file,
                                message: `Размер файла превышает ${fileSize} Мб`,
                              };
                            } else {
                              return file;
                            }
                          }),
                        );

                        return Promise.reject();
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <UploadButton multiple />
              </Form.Field>
            </FilesFormFieldWrapper>
            {version && (
              <Alert
                style={alertVersionStyle}
                type='info'
                description={
                  <>
                    <span style={labelVersionStyle}>Версия: </span>
                    <span>{version}</span>
                  </>
                }
                showIcon={false}
              />
            )}
          </Form>
        </div>
      </Drawer>
    </>
  );
};
