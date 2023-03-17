import type { Socket as S } from 'socket.io-client'
import { ServerToClient } from './store/socket'

type EmitArgs<T> =
  | {
      key: 'nick_name'
      args: {
        id: string
        nickName: string
        name: string
        password: string
        people: number
      }
    }
  | {
      key: 'room_new'
      args: { name: string; password: string; people: number }
    }

type EmitHandler = <T extends string>(arg: EmitArgs<T>) => boolean

declare module 'socket.io-client' {
  interface Socket extends S {
    listen: (key: keyof ServerToClient, fn: (...args: any[]) => void) => void
  }
}
