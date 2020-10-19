interface Response extends Object {
  status: boolean
  message: string
}

export interface Error extends Object {
  type: string
  error: any
}

export default Response