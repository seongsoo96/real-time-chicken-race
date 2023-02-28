import { useLocation, useNavigate } from 'react-router-dom'
import { socket } from '../store/socket'
export default function Room() {
  const location = useLocation()
  const navigate = useNavigate()
  const info = location.state

  socket.on('room_enter', (room) => {
    console.log('Enter room')
    console.log(room)
    console.log('hello')
  })

  return (
    <>
      <p>{info.name}</p>
      <p>{info.password}</p>
      <p>{info.people}</p>
      <p>{info.id}</p>
      <p onClick={() => navigate('/')}>홈으로</p>
    </>
  )
}
