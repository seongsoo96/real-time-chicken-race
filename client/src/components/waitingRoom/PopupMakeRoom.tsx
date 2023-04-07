import {
  useFormStateStore,
  useOpenMakeRoomPopupStore,
  useOpenNickPopupStore,
} from '../../store/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../../store/socket'
import Popup from '../common/Popup'
import PopupInput from '../common/PopupInput'
import { useToast } from '@chakra-ui/react'

export default function MakeRoomPopup() {
  const { openMakeRoomPopup, setOpenMakeRoomPopup } =
    useOpenMakeRoomPopupStore()
  const { setOpenNickPopup } = useOpenNickPopupStore()
  const navigate = useNavigate()
  const { formState, setFormState } = useFormStateStore()
  const toast = useToast()
  const css = {
    bgc1: '#E3F1F9',
    bgc2: '#86BBD7',
    bgc3: '#71AAC6',
    mt: '192px',
    img: '/images/waitingRoom/btnConfirmBlue.png',
    imgPush: '/images/waitingRoom/btnConfirmBluePush.png',
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name)
    const { name, value } = event.target
    setFormState({ ...formState, [name]: value })
  }

  const handleClick = () => {
    socket.emit('room_name_check', formState.name)
  }

  const handlePopupClose = () => {
    console.log('handlePopupClose :::: ')
    setOpenMakeRoomPopup(false)
  }

  useEffect(() => {
    socket.listen('navigate', (name) => {
      navigate(`/room/${name}`)
    })
    socket.listen('room_name_ok', (check) => {
      //중복된 이름의 방이 존재할 경우 false, 없을 경우 true
      if (check) {
        setOpenNickPopup({ openNickPopup: true, type: 'new' })
      } else {
        toast({
          title: '방제목 중복입니다.',
          status: 'error',
          position: 'top',
          duration: 2000,
        })
      }
    })
  }, [])

  return (
    <>
      <Popup
        open={openMakeRoomPopup}
        close={handlePopupClose}
        func={handleClick}
        css={css}
      >
        <PopupInput
          title="방제목"
          type="text"
          name="name"
          value={formState.name}
          func={handleInputChange}
        />
        <PopupInput
          title="비밀번호"
          type="text"
          name="password"
          value={formState.password}
          func={handleInputChange}
        />
        <PopupInput
          title="인원수"
          type="text"
          name="people"
          value={formState.people}
          func={handleInputChange}
        />
      </Popup>
    </>
  )
}
