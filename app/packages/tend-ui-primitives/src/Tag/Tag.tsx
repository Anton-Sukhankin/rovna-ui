import React from 'react';
import { extractMarginProps, extractPaddingProps } from '@rovna-ui/styling';
import { useTranslation } from '@rovna-ui/locale';
import { isString } from '@rovna-ui/utils';
import { useForwardRef } from '@rovna-ui/hooks';
import cn from 'classnames';
import { Close } from '@rovna-ui/icons/Close';
import { useColor, useTheme } from '@rovna-ui/theme';

import { Root } from './styled';
import { TagProps, TagRef } from './types';
import { Tooltip, TooltipProps } from '../Tooltip';
import styles from './Tag.module.css';

const BaseTag = function (
  {
    ellipsis = false,
    width,
    maxWidth,
    closable = false,
    shape = 'ellipse',
    size = 'medium',
    preset = 'default',
    color,
    backgroundColor,
    children,
    onClose,
    closeIconTooltip,
    before,
    after,
    borderRadius,
    className,
    style,
    ...props
  }: TagProps,
  ref: React.ForwardedRef<TagRef>,
) {
  const theme = useTheme();
  const t = useTranslation();
  const [visible, setVisible] = React.useState(true);
  const _color = useColor(color);
  // FIXME: Find a workaround
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const _backgroundColor = useColor(backgroundColor);

  const handleClose = React.useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      setVisible(false);
      onClose?.(e);
    },
    [onClose],
  );

  const tooltipProps = React.useMemo<TooltipProps>(() => {
    if (!closeIconTooltip) return { title: t(['general', 'close']) };

    return closeIconTooltip;
  }, [closeIconTooltip, t]);

  const _ref = useForwardRef<TagRef>(ref);
  const [_width, _setWidth] = React.useState<number | null>(null);
  React.useEffect(() => {
    if (!_ref.current) return;
    const width = _ref.current.getBoundingClientRect().width;
    if (!width) return;
    _setWidth(width);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _style = React.useMemo<React.CSSProperties | undefined>(() => {
    if (!_width) return { ...style, whiteSpace: 'nowrap' };

    if (ellipsis)
      return {
        ...style,
        display: 'inline-block',
        whiteSpace: 'nowrap',
        width: _width,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      };

    return { ...style, whiteSpace: 'nowrap' };
  }, [_width, ellipsis, style]);

  const { rest: withoutMargins, ...margins } = React.useMemo(
    () => extractMarginProps(props),
    [props],
  );

  const { rest, ...paddings } = React.useMemo(
    () => extractPaddingProps(withoutMargins),
    [withoutMargins],
  );

  if (!visible) return null;

  const title = ellipsis ? (isString(children) ? children : undefined) : undefined;

  return (
    <Root
      data-testid='rovna-ui-tag'
      title={title}
      {...rest}
      {...margins}
      {...paddings}
      ref={_ref}
      theme={theme}
      $color={_color}
      $backgroundColor={_backgroundColor}
      $preset={preset}
      $pointer={!!props.onClick}
      $borderRadius={borderRadius}
      $width={width}
      $maxWidth={maxWidth}
      $size={size}
      $shape={shape}
      className={cn(['rovna-ui-tag', className], {
        /**
         * Presets
         */
        [styles['rovna-ui-tag-preset-default']]: preset === 'default',
        [styles['rovna-ui-tag-preset-gray']]: preset === 'gray',
        [styles['rovna-ui-tag-preset-blue']]: preset === 'blue',
        [styles['rovna-ui-tag-preset-geekblue']]: preset === 'geekblue',
        [styles['rovna-ui-tag-preset-green']]: preset === 'green',
        [styles['rovna-ui-tag-preset-yellow']]: preset === 'yellow',
        [styles['rovna-ui-tag-preset-red']]: preset === 'red',
        [styles['rovna-ui-tag-preset-cyan']]: preset === 'cyan',
        [styles['rovna-ui-tag-preset-volcano']]: preset === 'volcano',
        [styles['rovna-ui-tag-preset-purple']]: preset === 'purple',
        [styles['rovna-ui-tag-preset-gray-light']]: preset === 'gray-light',
        [styles['rovna-ui-tag-preset-blue-light']]: preset === 'blue-light',
        [styles['rovna-ui-tag-preset-geekblue-light']]: preset === 'geekblue-light',
        [styles['rovna-ui-tag-preset-green-light']]: preset === 'green-light',
        [styles['rovna-ui-tag-preset-yellow-light']]: preset === 'yellow-light',
        [styles['rovna-ui-tag-preset-red-light']]: preset === 'red-light',
        [styles['rovna-ui-tag-preset-cyan-light']]: preset === 'cyan-light',
        [styles['rovna-ui-tag-preset-volcano-light']]: preset === 'volcano-light',
        [styles['rovna-ui-tag-preset-purple-light']]: preset === 'purple-light',
        /**
         * Shape
         */
        [styles['rovna-ui-tag-shape-ellipse']]: shape === 'ellipse',
        [styles['rovna-ui-tag-shape-round']]: shape === 'round',
        /**
         * Size
         */
        [styles['rovna-ui-tag-size-medium']]: size === 'medium',
        [styles['rovna-ui-tag-size-large']]: size === 'large',
      })}
      style={_style}
    >
      {before}
      {children}
      {after}
      {closable && (
        <Tooltip {...tooltipProps}>
          <Close onClick={handleClose} size={12} />
        </Tooltip>
      )}
    </Root>
  );
};

const Tag = React.forwardRef<TagRef, TagProps>(BaseTag);

Tag.displayName = 'Tag';

export { Tag };
