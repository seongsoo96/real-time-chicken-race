import type { Socket as S } from 'socket.io-client'

declare module 'socket.io-client' {
  interface Socket extends S {
    listen: (key: string, fn: (...args: any[]) => void) => void
  }
}
