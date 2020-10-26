/**
 * @description interface chat sesuai dari rest-api
 * @interface Chat @extends Object
 * @property {string} email string
 * @property {boolean} status_online boolean
 * @property {number} last_online number
 * @property {string} image string
 * @property {string} created_at string
 * @property {string} updated_at string
 */
export interface User extends Object {
  email: string,
  status_online: boolean,
  last_online: number,
  image: string,
  created_at: string
  updated_at: string
}