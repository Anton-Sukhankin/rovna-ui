import { MarginProperties } from '../types/MarginProperties';

export const extractMarginProps = <T extends MarginProperties>(props: T) => {
  const { margin, mt, mr, mb, ml, ...rest } = props;

  return {
    $margin: margin,
    $marginTop: mt,
    $marginRight: mr,
    $marginBottom: mb,
    $marginLeft: ml,
    rest,
  };
};
