import { px } from './px';

describe('px', () => {
  describe('when given value is number', () => {
    it('appends "px" unit', () => {
      const result = px(150);
      expect(result).toBe('150px');
    });
  });
  describe('when given value is string', () => {
    it('does not append "px" unit', () => {
      const result = px('150');
      expect(result).toBe('150');
    });
  });
});
