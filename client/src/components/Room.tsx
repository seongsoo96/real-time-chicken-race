import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { socket } from '../store/socket'
export default function Room() {
  const location = useLocation()
  const navigate = useNavigate()
  let roomInfo: any = {}
  useEffect(() => {
    socket.on('room_enter', (room) => {
      console.log(`Enter room ${room.name}`)
      console.log('room :::')
      console.log(room)
      roomInfo = { ...room }
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
