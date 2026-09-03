import React from 'react';
import AntModal from 'antd-core/es/modal';
import { Info } from '@rovna-ui/icons/Info';
import { Error } from '@rovna-ui/icons/Error';
import { DoneCircle } from '@rovna-ui/icons/DoneCircle';
import { Cancel } from '@rovna-ui/icons/Cancel';

import { CloseIcon, Footer } from './components';
import { Box, ImageContainer, Img, Styles } from './styled';
import { DialogMethodConfirmProps, DialogMethodProps, DialogMethods } from './types';

const methodsFactory = <T extends DialogMethods>(modal: T) => {
  return {
    info: ({
      footer,
      closeIconTooltip,
      okButtonProps,
      cancelButtonProps,
      okText = 'Принять',
      cancelText = 'Отмена',
      closable = true,
      content,
      okType = 'primary',
      ...props
    }: DialogMethodProps) => {
      const instance = modal.info({
        icon: <Info padding={4} />,
        width: 480,
        ...props,
        content: (
          <Box $display='flex' $flexDirection='column' $gap={8}>
            {content}
          </Box>
        ),
        footer: (
          <Footer
            footer={footer}
            okButtonProps={{ variant: okType, ...okButtonProps }}
            cancelButtonProps={cancelButtonProps}
            okText={okText}
            cancelText={cancelText}
            onOk={props.onOk}
            onCancel={props.onCancel}
            destroy={() => {
              instance.destroy();
            }}
          />
        ),
        closeIcon: <CloseIcon {...closeIconTooltip} />,
        closable,
      });

      return instance;
    },
    success: ({
      footer,
      closeIconTooltip,
      okButtonProps,
      cancelButtonProps,
      okText = 'Принять',
      cancelText = 'Отмена',
      closable = true,
      content,
      okType = 'primary',
      ...props
    }: DialogMethodProps) => {
      const instance = modal.success({
        icon: <DoneCircle padding={4} />,
        width: 480,
        ...props,
        content: (
          <Box $display='flex' $flexDirection='column' $gap={8}>
            {content}
          </Box>
        ),
        footer: (
          <Footer
            footer={footer}
            okButtonProps={{ variant: okType, ...okButtonProps }}
            cancelButtonProps={cancelButtonProps}
            okText={okText}
            cancelText={cancelText}
            onOk={props.onOk}
            onCancel={props.onCancel}
            destroy={() => {
              instance.destroy();
            }}
          />
        ),
        closeIcon: <CloseIcon {...closeIconTooltip} />,
        closable,
      });

      return instance;
    },
    warning: ({
      footer,
      closeIconTooltip,
      okButtonProps,
      cancelButtonProps,
      okText = 'Принять',
      cancelText = 'Отмена',
      closable = true,
      content,
      okType = 'primary',
      ...props
    }: DialogMethodProps) => {
      const instance = modal.warning({
        icon: <Error padding={4} />,
        width: 480,
        ...props,
        content: (
          <Box $display='flex' $flexDirection='column' $gap={8}>
            {content}
          </Box>
        ),
        footer: (
          <Footer
            footer={footer}
            okButtonProps={{ variant: okType, ...okButtonProps }}
            cancelButtonProps={cancelButtonProps}
            okText={okText}
            cancelText={cancelText}
            onOk={props.onOk}
            onCancel={props.onCancel}
            destroy={() => {
              instance.destroy();
            }}
          />
        ),
        closeIcon: <CloseIcon {...closeIconTooltip} />,
        closable,
      });

      return instance;
    },
    error: ({
      footer,
      closeIconTooltip,
      okButtonProps,
      cancelButtonProps,
      okText = 'Принять',
      cancelText = 'Отмена',
      closable = true,
      content,
      okType = 'primary',
      ...props
    }: DialogMethodProps) => {
      const instance = modal.error({
        icon: <Cancel padding={4} />,
        width: 480,
        ...props,
        content: (
          <Box $display='flex' $flexDirection='column' $gap={8}>
            {content}
          </Box>
        ),
        footer: (
          <Footer
            footer={footer}
            okButtonProps={{ variant: okType, ...okButtonProps }}
            cancelButtonProps={{ danger: true, ...cancelButtonProps }}
            okText={okText}
            cancelText={cancelText}
            onOk={props.onOk}
            onCancel={props.onCancel}
            destroy={() => {
              instance.destroy();
            }}
          />
        ),
        closeIcon: <CloseIcon {...closeIconTooltip} />,
        closable,
      });

      return instance;
    },
    confirm: ({
      footer,
      closeIconTooltip,
      okButtonProps,
      cancelButtonProps,
      okText = 'Принять',
      cancelText = 'Отмена',
      image = { layout: 'contain' },
      closable = true,
      content,
      className,
      okType = 'primary',
      ...props
    }: DialogMethodConfirmProps) => {
      const hasImage = !!image.src;
      const imageDefaultLayout = image.layout || 'contain';
      const isCoverLayout = imageDefaultLayout === 'cover';
      const classNames = [className];
      if (hasImage) classNames.push('rovna-ui-modal-confirm-image');
      if (isCoverLayout) classNames.push('rovna-ui-modal-confirm-image-cover');

      const instance = modal.confirm({
        width: 480,
        ...props,
        closable,
        className: classNames.filter(Boolean).join(' '),
        content: (
          <Box $display='flex' $flexDirection='column' $gap={8}>
            {content}
          </Box>
        ),
        footer: (
          <Footer
            padding={isCoverLayout ? '0 32px 24px' : undefined}
            footer={footer}
            okButtonProps={{ variant: okType, ...okButtonProps }}
            cancelButtonProps={cancelButtonProps}
            okText={okText}
            cancelText={cancelText}
            onOk={props.onOk}
            onCancel={props.onCancel}
            destroy={() => {
              instance.destroy();
            }}
          />
        ),
        closeIcon: <CloseIcon {...closeIconTooltip} />,
        icon: hasImage ? (
          <ImageContainer $layout={imageDefaultLayout}>
            <Img src={image.src} />
          </ImageContainer>
        ) : null,
      });

      return instance;
    },
  };
};

export const Dialog = Object.assign(
  {
    Styles,
    useDialog: () => {
      const [methods, holder] = AntModal.useModal();

      return [methodsFactory(methods), holder] as const;
    },
    destroyAll: AntModal.destroyAll,
    config: AntModal.config,
  },
  methodsFactory(AntModal),
);
