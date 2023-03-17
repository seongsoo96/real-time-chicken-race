import { io, Socket } from 'socket.io-client'
import { FormState, RoomInfo } from '../types/room'
interface ClientToServer {
  nick_name: (args: { id: string; nickName: string }) => void
  room_enter: (roomName: string) => void
  pw_check: (args: RoomInfo & { password: string }) => void
  room_list: () => void
  room_new: (formState: FormState) => void
}
interface SocketErrorMessage {
  msg: string
  type: 'pw_check' | 'nick_check'
}

export interface ServerToClient {
  error: (message: SocketErrorMessage) => void
  nick_name_ok: (formState: FormState) => void
  navigate: (name: string) => void
  room_list: (roomList: RoomInfo[]) => void
  pw_check_ok: () => void
}
const socket: Socket<ServerToClient, ClientToServer> = io('localhost:3001/')
socket.listen = (key: keyof ServerToClient, fn: (...args: any[]) => void) => {
  if (socket.hasListeners(key)) {
    socket.removeListener(key)
    socket.on(key, fn)
  } else {
    socket.on(key, fn)
  }
}
export { socket }
