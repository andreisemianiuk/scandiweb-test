export const currencyMarks: CurrencyMarksType = {
  'USD': String.fromCharCode(0x24),
  'GBP': String.fromCharCode(0xA3),
  'AUD': String.fromCharCode(0x24),
  'JPY': String.fromCharCode(0xA5),
  'RUB': String.fromCharCode(0x20BD),
}

export const currencyConverter = (currency: string): string => {
  // @ts-ignore
  return currencyMarks[currency]
}