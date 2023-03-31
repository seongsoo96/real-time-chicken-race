import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../../store/socket'
import {
  useFormStateStore,
  useOpenMakeRoomPopupStore,
  useOpenNickPopupStore,
} from '../../store/store'
import Popup from '../common/Popup'
import PopupInput from '../common/PopupInput'

export default function MakeRoomPopup() {
  const { openMakeRoomPopup, setOpenMakeRoomPopup } =
    useOpenMakeRoomPopupStore()
  const { setOpenNickPopup } = useOpenNickPopupStore()
  const navigate = useNavigate()
  const { formState, setFormState } = useFormStateStore()
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
    setOpenNickPopup({ openNickPopup: true, type: 'new' })
  }

  const handlePopupClose = () => {
    console.log('handlePopupClose :::: ')
    setOpenMakeRoomPopup(false)
  }

  useEffect(() => {
    socket.listen('navigate', (name) => {
      navigate(`/room/${name}`)
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
