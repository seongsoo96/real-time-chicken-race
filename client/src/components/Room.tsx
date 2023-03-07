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
      console.log(`Enter room ${room.name}`)
      console.log('room :::')
      console.log(room)
      setRoomInfo({ ...room })
      console.log('roomInfo :::')
      console.log(roomInfo)
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
