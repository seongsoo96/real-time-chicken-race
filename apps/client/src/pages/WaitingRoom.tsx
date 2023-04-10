import { Alert, AlertIcon, AlertTitle, useToast } from '@chakra-ui/react'
import {
  useOpenNickPopupStore,
  useOpenPwPopupStore,
  useRoomStore,
} from '../store/store'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../store/socket'
import { RoomInfo } from 'types'
import GameHeader from '../components/waitingRoom/GameHeader'
import Wrapper from '../components/waitingRoom/Wrapper'
import PasswordPopup from '../components/waitingRoom/PopupPassword'
import NickNamePopup from '../components/waitingRoom/PopupNickName'
import ListItems from '../components/common/ListItems'
import ListItem from '../components/common/ListItem'
import EnterButton from '../components/waitingRoom/EnterButton'
import RoomItemInfo from '../components/waitingRoom/RoomItemInfo'

export default function WaitingRoom() {
  const [roomList, setRoomList] = useState<RoomInfo[]>([])
  const { setOpenNickPopup } = useOpenNickPopupStore()
  const { setOpenPwPopup } = useOpenPwPopupStore()
  const navigate = useNavigate()
  const setRoom = useRoomStore((state) => state.setRoom)
  const toast = useToast()

  const openPwCheckPopup = (room: RoomInfo) => {
    setRoom(room)
    setOpenPwPopup(true)
  }

  useEffect(() => {
    socket.listen('room_list', (list) => {
      setRoomList(list)
    })
    socket.emit('room_list')
    socket.listen('pw_check_ok', () => {
      console.log('?????')
      setOpenPwPopup(false)
      setOpenNickPopup({ openNickPopup: true, type: 'enter' })
    })
    socket.listen('navigate', (roomName) => {
      console.log('roomName ::: ', roomName)
      navigate(`/room/${roomName}`)
    })
    socket.listen('error', (err) => {
      console.log('err ::: ', err)
      toast({
        title: err.msg,
        status: 'error',
        position: 'top',
        duration: 2000,
      })
    })
    return () => {
      socket.off('room_list')
    }
  }, [])

  return (
    <>
      <Wrapper>
        <GameHeader />
        {roomList.length ? (
          <ListItems>
            {roomList.map((room, idx) => (
              <ListItem
                key={idx}
                info={<RoomItemInfo room={room} />}
                rightBox={<EnterButton func={() => openPwCheckPopup(room)} />}
              />
            ))}
          </ListItems>
        ) : null}
        <PasswordPopup />
        <NickNamePopup />
      </Wrapper>
    </>
  )
}
