import { PaddingProperties } from '../types/PaddingProperties';

export const extractPaddingProps = <T extends PaddingProperties>(props: T) => {
  const { padding, pt, pr, pb, pl, ...rest } = props;

  return {
    $padding: padding,
    $paddingTop: pt,
    $paddingRight: pr,
    $paddingBottom: pb,
    $paddingLeft: pl,
    rest,
  };
};
