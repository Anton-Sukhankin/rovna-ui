import React from 'react';

import { Button } from '@rovna-ui/primitives';
import { Toast } from '@rovna-ui/components/primitives';

export const ToastPage = () => {
  const [api, holder] = Toast.useToast();

  return (
    <div>
      {holder}
      <Button
        onClick={() => {
          Toast.success({ message: 'Hello Static Toast' });
        }}
      >
        Static Toast
      </Button>
      <Button
        onClick={() => {
          api.success({ message: 'Hello Static Toast' });
        }}
      >
        Hook Toast
      </Button>
    </div>
  );
};
