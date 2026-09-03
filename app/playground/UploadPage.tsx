import axios from 'axios';
import React from 'react';
import { Upload } from 'antd-core';

import { Attachment, UploadArea } from '@rovna-ui/upload';

import { UploadAreaRef } from '../packages/tend-ui-upload/src/types';

export const UploadPage = () => {
  const ref = React.useRef<UploadAreaRef | null>(null);

  return (
    <div>
      <Upload
        onChange={e => {
          console.log(e);
        }}
        action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
        listType='picture'
        maxCount={3}
        multiple
      >
        Test
      </Upload>
      <UploadArea
        max={2}
        ref={ref}
        multiple
        onUpload={attachments => {
          const promises = attachments
            .filter(attachment => !!attachment.file)
            .map(attachment => {
              const formData = new FormData();
              formData.append('file', attachment.file as File);

              return axios.post<FormData, Attachment>(
                'https://localhost:8080/api/upload/',
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                  onUploadProgress: e => {
                    const percent = (e.loaded / e.total) * 100;
                    ref.current?.setProgress(attachment.uuid, Math.round(percent));
                  },
                },
              );
            });

          return Promise.all(promises);
        }}
      />
    </div>
  );
};
