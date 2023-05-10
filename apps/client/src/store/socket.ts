import { ServerToClientEvents, ClientToServerEvents } from 'types'
import { io, Socket } from 'socket.io-client'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  import.meta.env.VITE_SERVER_URL,
)

socket.listen = (
  key: keyof ServerToClientEvents,
  fn: (...args: any[]) => void,
) => {
  if (socket.hasListeners(key)) {
    socket.removeListener(key)
    socket.on(key, fn)
  } else {
    socket.on(key, fn)
  }
}
export { socket }
