import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Grid,
  Table,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../store/socket'
import { RoomInfo } from 'types'
import GameHeader from '../components/waitingRoom/GameHeader'
import Wrapper from '../components/waitingRoom/Wrapper'
import {
  useOpenNickPopupStore,
  useOpenPwPopupStore,
  useRoomStore,
} from '../store/store'
import PasswordPopup from '../components/waitingRoom/PopupPassword'
import NickNamePopup from '../components/waitingRoom/PopupNickName'
import List from '../components/trash/List'
import RoomListItem from '../components/trash/RoomListItem'
import PlayerListItem from '../components/room/PlayerListItem'
import ListItems from '../components/common/ListItems'
import ListItem from '../components/common/ListItem'
import EnterButton from '../components/waitingRoom/EnterButton'

export default function WaitingRoom() {
  const { openNickPopup, setOpenNickPopup } = useOpenNickPopupStore()
  const [roomList, setRoomList] = useState<RoomInfo[]>([])
  const room = useRoomStore((state) => state.room)
  const { openPwPopup, setOpenPwPopup } = useOpenPwPopupStore()
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const setRoom = useRoomStore((state) => state.setRoom)

  const openPwCheckPopup = (room: RoomInfo) => {
    console.log('ddddd')
    setRoom(room)
    setOpenPwPopup(true)
  }
  useEffect(() => {
    socket.listen('room_list', (list) => {
      setRoomList(list)
    })
    socket.emit('room_list')
    socket.on('pw_check_ok', () => {
      console.log('?????')
      setOpenPwPopup(false)
      setOpenNickPopup({ openNickPopup: true, type: 'enter' })
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
        // setOpenNickPopup(false)
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
        {roomList.length ? (
          <ListItems>
            {roomList.map((room, idx) => (
              <ListItem
                key={idx}
                description={
                  <>
                    <Box
                      w="74px"
                      h="16px"
                      bgColor="#069CD8"
                      mb={1.5}
                      borderRadius="md"
                    >
                      <Text fontSize="10px" color="#fff">
                        공개 : {room.count}/{room.people} 입장
                      </Text>
                    </Box>
                    <Box w="160px" h="18px">
                      <Text fontSize="14px" align="left">
                        {room.name}
                      </Text>
                    </Box>
                  </>
                }
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
