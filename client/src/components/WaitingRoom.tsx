import { Box, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoomInfo } from '../../interface'
import { socket } from '../store/socket'
import { useRoomListStore } from '../store/store'

export default function WaitingRoom() {
  // const { roomList, addRoom, removeRoom, updateRoom } = useRoomListStore()
  const [roomList, setRoomList] = useState<RoomInfo[]>()
  const navigate = useNavigate()
  const makeNewRoom = () => {
    navigate('/makeNewRoom')
  }

  useEffect(() => {
    socket.on('room_list', (roomList) => {
      console.log('room_list')
      console.log(roomList)
      setRoomList(roomList)
      console.log('waiting room')
    })
  }, [])

  return (
    <>
      <h1>Dino</h1>
      <Button onClick={makeNewRoom} colorScheme="blue">
        방만들기
      </Button>
      <hr />
      <h1>방 목록</h1>
      <ul>
        {roomList?.map((room, idx) => (
          <li key={idx}>{room.name}</li>
        ))}
      </ul>
    </>
  )
}
