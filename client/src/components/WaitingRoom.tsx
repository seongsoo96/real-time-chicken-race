import { Box, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoomInfo } from '../../interface'
import { socket } from '../store/socket'
import { useRoomListStore } from '../store/store'
type roomInfo = {
  name: String
  password: String
  people: number
}

export default function WaitingRoom() {
  const [roomList, setRoomList] = useState<roomInfo[]>([])
  const navigate = useNavigate()
  const makeNewRoom = () => {
    navigate('/makeNewRoom')
  }

  useEffect(() => {
    socket.on('room_list', (list) => {
      console.log(list)
      setRoomList(list)
    })
    socket.emit('room_list')

    return () => {
      socket.off('room_list')
    }
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
          <>
            <li key={idx}>{room.name}</li>
            <li key={idx}>{room.people}</li>
          </>
        ))}
      </ul>
    </>
  )
}
