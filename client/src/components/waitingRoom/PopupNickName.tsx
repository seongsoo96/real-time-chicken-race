import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Box,
  Text,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { socket } from '../../store/socket'
import {
  useFormStateStore,
  useOpenNickPopupStore,
  useRoomStore,
} from '../../store/store'
import Popup from '../common/Popup'
import PopupInput from '../common/PopupInput'

export default function PopupNickName() {
  const [value, setValue] = useState('')
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
    setValue(event.target.value)
  }

  const handleClick = () => {
    if (type === 'new') {
      socket.emit('nick_name', {
        id: socket.id,
        nickName: value,
        ...formState,
      })
      setFormState({
        name: '',
        password: '',
        people: 0,
      })
    } else if (type === 'enter') {
      socket.emit('nick_name', {
        id: socket.id,
        nickName: value,
        name: room.name,
        people: room.people,
        password: '',
      })
      setRoom({
        name: '',
        people: 0,
        count: 0,
      })
    }
    setValue('')
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
        value={value}
        func={handleInputChange}
      />
    </Popup>
  )
}
