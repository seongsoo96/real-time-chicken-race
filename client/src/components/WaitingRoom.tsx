import { Box, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '../../interface'
import { useSocketStore } from '../store/store'

export default function WaitingRoom() {
  const socket = useSocketStore((state) => state)
  const navigate = useNavigate()
  const makeNewRoom = () => {
    navigate('/makeNewRoom')
  }
  return (
    <>
      <h1>Dino</h1>
      <Button onClick={makeNewRoom} colorScheme="blue">
        방만들기
      </Button>
      <hr />
      <h1>방 목록</h1>
      <ul></ul>
    </>
  )
}
