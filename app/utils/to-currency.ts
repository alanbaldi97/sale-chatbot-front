

export default function toCurrency(value: number, locale: string = 'es-MX', currency: string = 'MXN'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}