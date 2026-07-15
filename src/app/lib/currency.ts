/** Официальный знак белорусского рубля (НБРБ): «Б» с горизонтальной чертой */
export const BYN_SIGN = 'Б\u0336'

/** Знак российского рубля */
export const RUB_SIGN = '₽'

/**
 * Ориентировочный курс для публичного прайса (согласован с /pricing):
 * 8 000 Б̶ ≈ 240 000 ₽ → 1 Б̶ = 30 ₽.
 * Итоговая смета фиксируется в договоре.
 */
export const BYN_TO_RUB = 30

export const DUAL_CURRENCY_NOTE =
  'Цены указаны в белорусских рублях (Б̶) и российских рублях (₽). Ориентиры; точная смета — после брифа.'

export function formatAmount(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export function bynToRub(byn: number): number {
  return Math.round(byn * BYN_TO_RUB)
}

type DualPriceOptions = {
  /** По умолчанию true — префикс «от » */
  from?: boolean
  /** Суффикс «+» у суммы */
  plus?: boolean
  /** «/мес» после каждой валюты */
  perMonth?: boolean
}

/** Одна строка: «от 8 000 Б̶ / 240 000 ₽» */
export function formatDualPrice(byn: number, options: DualPriceOptions = {}): string {
  const { from = true, plus = false, perMonth = false } = options
  const prefix = from ? 'от ' : ''
  const plusMark = plus ? '+' : ''
  const per = perMonth ? '/мес' : ''
  const rub = bynToRub(byn)
  return `${prefix}${formatAmount(byn)} ${BYN_SIGN}${plusMark}${per} / ${formatAmount(rub)} ${RUB_SIGN}${plusMark}${per}`
}

/** Две строки для карточек прайса */
export function dualPriceLines(byn: number, options: DualPriceOptions = {}) {
  const { from = true, plus = false, perMonth = false } = options
  const prefix = from ? 'от ' : ''
  const plusMark = plus ? '+' : ''
  const per = perMonth ? '/мес' : ''
  const rub = bynToRub(byn)
  return {
    byn: `${prefix}${formatAmount(byn)} ${BYN_SIGN}${plusMark}${per}`,
    rub: `${from ? 'или от ' : ''}${formatAmount(rub)} ${RUB_SIGN}${plusMark}${per}`,
  }
}
