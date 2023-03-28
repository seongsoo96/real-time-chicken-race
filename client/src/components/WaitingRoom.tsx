import {
  Box,
  Heading,
  VStack,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  Image,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../store/socket'
import { RoomInfo } from 'types'
import Popup from './Popup'

const defaultRoomInfo: RoomInfo = {
  name: '',
  people: 0,
  count: 0,
}

export default function WaitingRoom() {
  const [openPwPopup, setOpenPwPopup] = useState(false)
  const [openNickPopup, setOpenNickPopup] = useState(false)
  const [roomList, setRoomList] = useState<RoomInfo[]>([])
  const [room, setRoom] = useState<RoomInfo>(defaultRoomInfo)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const makeNewRoom = () => {
    navigate('/makeNewRoom')
  }

  const openPwCheckPopup = (room: RoomInfo) => {
    setRoom(room)
    setOpenPwPopup(true)
  }

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
      <Box
        p="4"
        bg="gray.50"
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          w="375px"
          minH="387px"
          bg="white"
          p="6"
          borderRadius="md"
          boxShadow="md"
          textAlign="center"
          bgImage="/images/bgMainScreen.png"
          bgSize="cover"
        >
          <Box boxSize="sm">
            <Image maxW="222px" src="/images/GameTitle.png" alt="chiken race" />
          </Box>{' '}
          <hr />
          <VStack spacing="4" align="stretch">
            <Button onClick={makeNewRoom} colorScheme="blue" mt="4">
              방만들기
            </Button>
            {roomList.map((room, idx) => (
              <Button
                key={idx}
                minWidth="max-content"
                alignItems="center"
                gap="2"
                onClick={() => openPwCheckPopup(room)}
              >
                <Box p="2" w="70%">
                  <Heading size="md" textAlign="left">
                    {room.name}
                  </Heading>
                </Box>
                <Box w="1px" h="100%" bgColor="blackAlpha.300" />
                <Box p="2">
                  <Heading size="md">
                    {room.count} / {room.people}
                  </Heading>
                </Box>
              </Button>
            ))}
          </VStack>
        </Box>
        <Popup
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
        />
      </Box>
    </>
  )
}
