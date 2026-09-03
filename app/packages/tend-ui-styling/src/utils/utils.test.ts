import { extractMarginProps } from './extractMarginProps';
import { extractPaddingProps } from './extractPaddingProps';

describe('extractMarginProps', () => {
  it('extract margin properties correctly', () => {
    const props = {
      margin: '20px',
      mt: '20px',
      mr: '20px',
      mb: '20px',
      ml: '20px',
    } as const;
    const result = extractMarginProps(props);

    expect(result).not.toHaveProperty('margin');
    expect(result).not.toHaveProperty('mt');
    expect(result).not.toHaveProperty('mr');
    expect(result).not.toHaveProperty('mb');
    expect(result).not.toHaveProperty('ml');
  });
});

describe('extractPaddingProps', () => {
  it('extract padding properties correctly', () => {
    const props = {
      padding: '20px',
      pt: '20px',
      pr: '20px',
      pb: '20px',
      pl: '20px',
    } as const;
    const result = extractPaddingProps(props);

    expect(result).not.toHaveProperty('padding');
    expect(result).not.toHaveProperty('pt');
    expect(result).not.toHaveProperty('pr');
    expect(result).not.toHaveProperty('pb');
    expect(result).not.toHaveProperty('pl');
  });
});
