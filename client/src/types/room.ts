export interface RoomInfo {
  name: string
  people: number
  count: number
}

export interface PlayerInfo {
  id: string
  nickName: string
}

export type FormState = {
  name: string
  password: string
  people: number
}
