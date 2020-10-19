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

export interface ChatHistory extends Object {
  target: string
  last: number
  text: string
}