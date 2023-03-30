import { FormState, RoomInfo } from 'types'
import { create } from 'zustand'

type RoomState = {
  room: RoomInfo
  setRoom: (room: RoomInfo) => void
}

export const useRoomStore = create<RoomState>()((set) => ({
  room: {
    name: '',
    people: 0,
    count: 0,
  },
  setRoom: (room) => set(() => ({ room })),
}))

type OpenPwPopupState = {
  openPwPopup: boolean
  setOpenPwPopup: (value: boolean) => void
}

export const useOpenPwPopupStore = create<OpenPwPopupState>((set) => ({
  openPwPopup: false,
  setOpenPwPopup: (value: boolean) => set({ openPwPopup: value }),
}))

type OpenMakeRoomPopupState = {
  openMakeRoomPopup: boolean
  setOpenMakeRoomPopup: (value: boolean) => void
}

export const useOpenMakeRoomPopupStore = create<OpenMakeRoomPopupState>(
  (set) => ({
    openMakeRoomPopup: false,
    setOpenMakeRoomPopup: (value: boolean) => set({ openMakeRoomPopup: value }),
  }),
)

type OpenNickPopupState = {
  openNickPopup: boolean
  setOpenNickPopup: (value: boolean) => void
}

export const useOpenNickPopupStore = create<OpenNickPopupState>((set) => ({
  openNickPopup: false,
  setOpenNickPopup: (value: boolean) => set({ openNickPopup: value }),
}))

const defaultFormState: FormState = {
  name: '',
  password: '',
  people: 0,
}

type FormStateStore = {
  formState: FormState
  setFormState: (formState: FormState) => void
}

export const useFormStateStore = create<FormStateStore>()((set) => ({
  formState: defaultFormState,
  setFormState: (formState) => set(() => ({ formState })),
}))
