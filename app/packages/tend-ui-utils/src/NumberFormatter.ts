export type NumberFormatterOptions = {
  currency?: true;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

const CURRENCY = 'RUB';

export class NumberFormatter {
  private formatter: Intl.NumberFormat;

  constructor(options?: NumberFormatterOptions) {
    this.formatter = new Intl.NumberFormat('ru-RU', {
      currency: CURRENCY,
      style: options?.currency ? 'currency' : undefined,
      minimumFractionDigits: options?.minimumFractionDigits,
      maximumFractionDigits: options?.maximumFractionDigits,
    });
    this.format = this.format.bind(this);
  }

  public format(payload: number) {
    return this.formatter.format(payload);
  }

  static format(payload: number, options?: NumberFormatterOptions) {
    const formatted = new Intl.NumberFormat('ru-RU', {
      currency: CURRENCY,
      style: options?.currency ? 'currency' : undefined,
      minimumFractionDigits: options?.minimumFractionDigits,
      maximumFractionDigits: options?.maximumFractionDigits,
    }).format(payload);

    return formatted;
  }
}
