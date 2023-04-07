import {
  useFormStateStore,
  useOpenNickPopupStore,
  useRoomStore,
} from '../../store/store'
import React, { useState } from 'react'
import { socket } from '../../store/socket'
import Popup from '../common/Popup'
import PopupInput from '../common/PopupInput'
import PopupRadio from '../common/PopupRadio'

export default function PopupNickName() {
  const [nickName, setNickName] = useState('')
  const [color, setColor] = useState('')
  const { openNickPopup, type, setOpenNickPopup } = useOpenNickPopupStore()
  const { formState, setFormState } = useFormStateStore()
  const { room, setRoom } = useRoomStore()
  const css = {
    bgc1: '#FFEFDD',
    bgc2: '#EFAF6F',
    bgc3: '#DF9A59',
    mt: '240px',
    img: '/images/waitingRoom/btnConfirmRed.png',
    imgPush: '/images/waitingRoom/btnConfirmRedPush.png',
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(event.target.value)
  }

  const handleColorChange = (color: string) => {
    setColor(color)
  }

  const handleClick = () => {
    console.log('handleClick :::: ')
    console.log('type ::: ', type)
    console.log('formState ::: ', formState)
    console.log('room ::: ', room)

    if (type === 'new') {
      socket.emit('nick_name_check', {
        id: socket.id,
        nickName: nickName,
        color: color,
        ...formState,
      })
      setFormState({
        name: '',
        password: '',
        people: 0,
      })
    } else if (type === 'enter') {
      socket.emit('nick_name_check', {
        id: socket.id,
        nickName: nickName,
        color: color,
        name: room.name,
        people: room.people,
        password: '',
      })
    }
    setNickName('')
  }

  const handlePopupClose = () => {
    setOpenNickPopup({ openNickPopup: false, type: '' })
  }

  return (
    <Popup
      open={openNickPopup}
      close={handlePopupClose}
      func={handleClick}
      css={css}
    >
      <PopupInput
        title="닉네임"
        type="text"
        name="nick_name"
        value={nickName}
        func={handleInputChange}
      />
      <PopupRadio func={handleColorChange} />
    </Popup>
  )
}
