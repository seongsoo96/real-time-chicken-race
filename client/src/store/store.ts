import create from 'zustand'
import { io, Socket } from 'socket.io-client'
const socket = io('localhost:3001')

export const useSocketStore = create<Socket>((set) => socket)
