import { Button } from '@rovna-ui/primitives';
import React from 'react';

const ApplyButton = ({ onClick }: { onClick?: () => void }) => {
  return <Button onClick={onClick}>Применить</Button>;
};

export { ApplyButton };
