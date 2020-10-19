/**
 * @description interface chat sesuai dari rest-api
 * @interface Chat @extends Object
 * @property {number} id number
 * @property {string} from string
 * @property {string} to string
 * @property {string} text string
 * @property {number} status number
 * @property {number} send_at number
 * @property {number} sent_at number
 * @property {number} receive_at number
 * @property {number} read_at number
 * @property {string} created_at string
 * @property {string} updated_at string
 */
export interface Chat extends Object {
  id: number
  from: string
  to: string
  text: string
  status: number
  send_at: number
  sent_at: number
  receive_at: number
  read_at: number
  created_at: string
  updated_at: string
}

/**
 * @description interface chat history sesuai result dari rest-api
 * @interface ChatHistory @extends Object
 * @property {string} target string
 * @property {number} last number
 * @property {string} text string
 */
export interface ChatHistory extends Object {
  target: string
  last: number
  text: string
}