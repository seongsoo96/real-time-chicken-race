import { io } from 'socket.io-client'
const socket = io('localhost:3001/')
socket.listen = (key: string, fn: (...args: any[]) => void) => {
  if (socket.hasListeners(key)) {
    socket.removeListener(key)
    socket.on(key, fn)
  } else {
    socket.on(key, fn)
  }
}

export { socket }
