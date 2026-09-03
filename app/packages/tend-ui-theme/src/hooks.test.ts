import { renderHook } from '@testing-library/react-hooks';

import { useColor } from './Theme';
import { SamoletTheme } from './SamoletTheme';

const presets = Object.keys(SamoletTheme.colors);

describe('useColor', () => {
  it('without given parameter returns correct result', () => {
    const result = renderHook(() => useColor());
    expect(result.result.current).toBeUndefined();
  });

  it('with given color returns correct result', () => {
    const result = renderHook(() => useColor('red'));
    expect(result.result.current).toBe('red');
  });

  it.each(presets)('with given %s preset color returns correct result', presetColor => {
    const k = presetColor as keyof typeof SamoletTheme.colors;
    const targetColor = SamoletTheme.colors[k];
    const result = renderHook(() => useColor(presetColor));
    expect(result.result.current).toBe(targetColor);
  });
});
