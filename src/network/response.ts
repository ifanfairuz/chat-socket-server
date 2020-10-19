import axios from 'axios'

interface Response {
  status: boolean,
  message: string
}

export interface Error {
  type: string,
  error: any
}

export default Response