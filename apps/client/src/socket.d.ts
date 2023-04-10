import type { Socket as S } from 'socket.io-client'
import { ServerToClientEvents } from 'types'

declare module 'socket.io-client' {
  interface Socket extends S {
    listen: (
      key: keyof ServerToClientEvents,
      fn: (...args: any[]) => void,
    ) => void
  }
}
