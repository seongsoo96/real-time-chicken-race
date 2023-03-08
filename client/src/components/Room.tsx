import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RoomInfo } from '../../interface'
import { socket } from '../store/socket'
export default function Room() {
  const location = useLocation()
  const navigate = useNavigate()
  const [roomInfo, setRoomInfo] = useState<RoomInfo>({
    name: '',
    password: '',
    people: 0,
  })
  useEffect(() => {
    socket.on('room_enter', (room) => {
      console.log(`${socket.id}가 방 '${room.name}'에 입장했습니다.`)
      console.log(socket)
      setRoomInfo({ ...room })
    })
    socket.on('people_list', (list) => {
      console.log('people_list ::: ', list)
    })
  }, [])

  return (
    <>
      {roomInfo.name}
      {roomInfo.password}
      {roomInfo.people}
      <p onClick={() => navigate('/')}>홈으로</p>
    </>
  )
}
