import { ReactNode } from "react"

export type GlobalLayoutProps = {
  children: ReactNode
}

export type RoomInfo = {
  name: string
  people: number
  count: number
}

export type PlayerInfo = {
  id: string
  nickName: string
  color: string
  score: number
}

export type ListItemProps = {
  mainIcon: string
  description: ReactNode
  buttonIcon: string
}

export type RoomInfoWithPw = RoomInfo & {
  password: string
}

export type FormState = {
  name: string
  password: string
  people: number
}

export type ServerToClientEvents = {
  room_list: (roomList: RoomInfo[]) => void
  room_enter: (room: RoomInfo, playerList: PlayerInfo[]) => void
  room_name_ok: (check: boolean) => void
  pw_check_ok: () => void
  nick_name_ok: (formState: FormState) => void
  navigate: (name: string) => void
  error: (message: SocketErrorMessage) => void
  room_update: (playerList: PlayerInfo[]) => void
  send_score: (playerList: PlayerInfo[]) => void
}

export type ClientToServerEvents = {
  room_list: () => void
  room_new: (formState: FormState) => void
  room_name_check: (roomName: string) => void
  room_enter: (roomName: string) => void
  pw_check: (args: RoomInfo & { password: string }) => void
  nick_name_check: (
    args: { id: string; nickName: string; color: string } & FormState
  ) => void
  user_leaving: () => void
  score: (id: string, score: number) => void
}

export type SocketErrorMessage = {
  msg: string
  type: "pw_check" | "nick_check"
}
