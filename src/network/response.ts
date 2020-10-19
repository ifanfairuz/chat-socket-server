/**
 * @description base response format
 * @interface Response @extends Object
 * @property {boolean} status boolean
 * @property {string} message string
 */
interface Response extends Object {
  status: boolean
  message: string
}

/**
 * @description base Error interface
 * @interface Error @extends Object
 * @property {string} type string
 * @property {any} error any
 */
export interface Error extends Object {
  type: string
  error: any
}

export default Response