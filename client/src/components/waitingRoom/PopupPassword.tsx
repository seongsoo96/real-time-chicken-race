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
  useOpenPwPopupStore,
  useRoomStore,
} from '../../store/store'
import Popup from '../common/Popup'
import PopupInput from '../common/PopupInput'

interface PopupProps {
  open?: Boolean
  func: (value: string) => void
  type: string
  title: string
}

export default function PopupPassword() {
  const [value, setValue] = useState('')
  const { openPwPopup, setOpenPwPopup } = useOpenPwPopupStore()
  const room = useRoomStore((state) => state.room)
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
    socket.emit('pw_check', { ...room, password: value })
  }
  const handlePopupClose = () => {
    setOpenPwPopup(false)
  }

  return (
    <Popup
      open={openPwPopup}
      close={handlePopupClose}
      func={handleClick}
      css={css}
    >
      <PopupInput
        title="비밀번호"
        type="text"
        name="password"
        value={value}
        func={handleInputChange}
      />
    </Popup>
  )
}
