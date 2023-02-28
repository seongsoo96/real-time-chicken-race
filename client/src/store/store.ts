import create from 'zustand'
import { RoomInfo } from '../../interface'

interface RoomListState {
  roomList: RoomInfo[]
  addRoom: (room: RoomInfo) => void
  removeRoom: (id: string) => void
  updateRoom: (id: string, updatedRoom: RoomInfo) => void
}

export const useRoomListStore = create<RoomListState>((set) => ({
  roomList: [],

  addRoom: (room) => {
    set((state) => ({ roomList: [...state.roomList, room] }))
  },

  removeRoom: (id) => {
    set((state) => ({
      roomList: state.roomList.filter((room) => room.id !== id),
    }))
  },

  updateRoom: (id, updatedRoom) => {
    set((state) => ({
      roomList: state.roomList.map((room) =>
        room.id === id ? { ...updatedRoom } : room,
      ),
    }))
  },
}))
