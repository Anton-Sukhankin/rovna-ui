import React from 'react';
import { isUndefined } from '@rovna-ui/utils';

import { Badge, BadgeProps } from '@rovna-internal/components/primitives/Badge';
import { Image } from '@rovna-internal/components/primitives/Avatar/components/Image';
import { Fallback } from '@rovna-internal/components/primitives/Avatar/components/Fallback';
import { Root } from '@rovna-internal/components/primitives/Avatar/components/Root';

import { AvatarProps, AvatarRef } from '../../types';
import { Unknown } from '../../Unknown';
import { UnknownGroup } from '../../UnknownGroup';

const presets = {
  online: 'green',
  offline: 'gray',
  away: 'yellow',
  busy: 'red',
} as const;

const BaseAvatar = (
  {
    size = 'medium',
    fit,
    children,
    status,
    src,
    alt = 'Аватар пользователя',
    pointer = false,
    bordered = false,
    UNSTABLE_styling,
    ...props
  }: AvatarProps,
  ref: React.ForwardedRef<AvatarRef>,
) => {
  const _src = Array.isArray(src) ? undefined : src;

  const fallbackNode = React.useMemo(() => {
    if (Array.isArray(src)) return <UnknownGroup size={size} />;

    return <Unknown size={size} />;
  }, [src, size]);

  const badgeProps = React.useMemo<BadgeProps>(() => {
    if (typeof status === 'object') return status;
    const preset = presets[status || 'online'];

    return {
      preset,
      offset: [0, 0],
      placement: 'rightBottom',
    };
  }, [status]);

  const content = React.useMemo(() => {
    if (isUndefined(children))
      return (
        <>
          <Image {...props} alt={alt} src={_src} fit={fit} />
          <Fallback {...props}>{fallbackNode}</Fallback>
        </>
      );

    return <Fallback {...props}>{children}</Fallback>;
  }, [_src, alt, children, fallbackNode, fit, props]);

  const child = (
    <Root
      ref={ref}
      size={size}
      pointer={pointer}
      bordered={bordered}
      UNSTABLE_styling={UNSTABLE_styling}
    >
      {content}
    </Root>
  );

  return status ? <Badge {...badgeProps}>{child}</Badge> : child;
};

const Avatar = React.forwardRef<AvatarRef, AvatarProps>(BaseAvatar);

Avatar.displayName = 'Avatar';

export { Avatar };
