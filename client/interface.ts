import { ReactNode } from 'react'
export interface ServerToClientEvents {
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
}

export interface ClientToServerEvents {
  hello: () => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  name: string
  age: number
}

export interface GlobalLayoutProps {
  children: ReactNode
}

export interface RoomInfo {
  name: string
  password: string
  people: number
  // id: string
}
