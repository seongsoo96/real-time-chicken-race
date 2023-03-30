import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../store/socket'
import { RoomInfo } from 'types'
import GameHeader from '../components/waitingRoom/GameHeader'
import RoomList from '../components/waitingRoom/RoomList'
import Wrapper from '../components/waitingRoom/Wrapper'
import Popup from '../components/Popup'
import {
  useOpenNickPopupStore,
  useOpenPwPopupStore,
  useRoomStore,
} from '../store/store'
import PasswordPopup from '../components/common/PasswordPopup'
import NickNamePopup from '../components/common/NickNamePopup'

export default function WaitingRoom() {
  const { openNickPopup, setOpenNickPopup } = useOpenNickPopupStore()
  const [roomList, setRoomList] = useState<RoomInfo[]>([])
  const room = useRoomStore((state) => state.room)
  const { openPwPopup, setOpenPwPopup } = useOpenPwPopupStore()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const checkPassword = (password: string) => {
    socket.emit('pw_check', { ...room, password })
  }

  const handleNickNameSetting = (nick: string) => {
    socket.emit('nick_name', {
      id: socket.id,
      nickName: nick,
      name: room.name,
      password: '',
      people: 0,
    })
  }

  useEffect(() => {
    socket.listen('room_list', (list) => {
      setRoomList(list)
    })
    socket.emit('room_list')
    socket.on('pw_check_ok', () => {
      console.log('?????')
      setOpenPwPopup(false)
      setOpenNickPopup(true)
    })
    socket.on('navigate', (roomName) => {
      console.log('roomName ::: ', roomName)
      navigate(`/room/${roomName}`)
    })
    socket.on('error', (err) => {
      console.log('err ::: ', err)
      setError(err.msg)
      if (err.type === 'pw_check') {
        setOpenPwPopup(false)
      } else if (err.type === 'nick_check') {
        setOpenNickPopup(false)
      }
    })
    return () => {
      socket.off('room_list')
    }
  }, [])

  return (
    <>
      {error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      ) : null}
      <Wrapper>
        <GameHeader />
        <RoomList roomList={roomList} />
        {/* <Popup
          open={openPwPopup}
          type="password"
          title="비밀번호"
          func={checkPassword}
        />
        <Popup
          type="nickname"
          title="닉네임"
          open={openNickPopup}
          func={handleNickNameSetting}
        /> */}
        <PasswordPopup />
        <NickNamePopup />
      </Wrapper>
    </>
  )
}
