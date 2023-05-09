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
  type: 'new' | 'enter' | ''
  setOpenNickPopup: (value: {
    openNickPopup: boolean
    type: 'new' | 'enter' | ''
  }) => void
}

export const useOpenNickPopupStore = create<OpenNickPopupState>((set) => ({
  openNickPopup: false,
  type: '',
  setOpenNickPopup: (value) => set({ ...value }),
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

type JumpStateStore = {
  jumpState: boolean
  setJumpState: (state: boolean) => void
}

export const useJumpStateStore = create<JumpStateStore>()((set) => ({
  jumpState: false,
  setJumpState: (state: boolean) => set({ jumpState: state }),
}))

type startStateStore = {
  startState: boolean
  setStartState: (state: boolean) => void
}

export const useStartStateStore = create<startStateStore>()((set) => ({
  startState: false,
  setStartState: (state: boolean) => set({ startState: state }),
}))

type resultStore = {
  result: number
  setResult: (state: number) => void
}

export const useResultStore = create<resultStore>()((set) => ({
  result: 0,
  setResult: (state: number) => set({ result: state }),
}))

type scoreStore = {
  score: number
  setScore: (state: number) => void
}

export const useScoreStore = create<scoreStore>()((set) => ({
  score: 0,
  setScore: (state: number) => set({ score: state }),
}))
