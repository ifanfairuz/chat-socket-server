/**
 * @description cek value is empty or not
 * @param {any} value any as T
 * @return {boolean} is empty
 * @public
 */
export function isEmpty(value: any): boolean {
  if (value instanceof String) {
    return (value === '')
  } else if (value instanceof Number) {
    return (value <= 0)
  }

  return (value === null || value === undefined)
}