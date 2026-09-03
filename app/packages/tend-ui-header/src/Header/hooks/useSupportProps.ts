import React from 'react';
import { usePostApi } from '@rovna-ui/api';

import { SendSupportEmail } from '@rovna-internal/header/Header/hooks/types';
import { FormState } from '@rovna-internal/header/core';

export const useSupportProps = (api = '/api/send-support-email/') => {
  const { request, loading, error } = usePostApi<SendSupportEmail, FormData>(api);

  const onSend = React.useCallback(
    async (state: FormState) => {
      const formData = new FormData(); // Используем FormData для бинарных данных

      // Добавляем текстовые поля
      formData.append('module', state.module);
      formData.append('criticality', state.criticality);
      formData.append('title', state.title);
      if (state.description) formData.append('description', state.description);
      formData.append('fio', state.fio);
      formData.append('role', state.role);
      formData.append('email', state.email);
      if (state.phone) formData.append('phone', state.phone);

      // Обрабатываем файлы
      if (state.files && state.files.length > 0) {
        state.files.forEach(file => {
          if (file.file) {
            formData.append('files', file.file); // Добавляем файлы как бинарные данные
          }
        });
      }

      await request(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    [request],
  );

  return {
    loading,
    error,
    onSend,
  };
};
