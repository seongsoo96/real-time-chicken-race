import {
  Box,
  Flex,
  Heading,
  Spinner,
  VStack,
  Text,
  Spacer,
  ButtonGroup,
  Button,
  ModalContent,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Input,
  InputProps,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../store/socket'
import Popup from './Popup'
// import { useRoomListStore } from '../store/store'
interface RoomInfo {
  name: string
  people: number
}

const defaultRoomInfo: RoomInfo = {
  name: '',
  people: 0,
}

export default function WaitingRoom() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [openPopup, setOpenPopup] = useState(false)
  const [inputPassword, setInputPassword] = useState('')
  const [roomList, setRoomList] = useState<RoomInfo[]>([])
  const [room, setRoom] = useState<RoomInfo>(defaultRoomInfo)
  const [pwCorrect, setPwCorrect] = useState(true)
  const navigate = useNavigate()
  const makeNewRoom = () => {
    navigate('/makeNewRoom')
  }

  const checkPassword = (password: string) => {
    socket.emit('pw_check', { ...room, password })
  }

  const openPwCheckPopup = (room: RoomInfo) => {
    setRoom(room)
    setOpenPopup(true)
  }

  const enterRoom = () => {
    socket.emit('room_enter', room)
    navigate(`/room/${room.name}`)
  }

  useEffect(() => {
    socket.on('room_list', (list) => {
      console.log('waitingRoom room_list.on list ::::', list)
      setRoomList(list)
    })
    socket.emit('room_list')

    return () => {
      socket.off('room_list')
    }
  }, [])

  useEffect(() => {
    socket.on('pw_check_ok', (ok) => {
      if (ok) {
        console.log('okokokok ::: ', room)
        enterRoom()
      } else {
        setPwCorrect(false)
        setOpenPopup(false)
      }
    })
  }, [room])

  return (
    <>
      {!pwCorrect ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>비번 틀림 ㅋㅋ</AlertTitle>
          <AlertDescription>
            Your Chakra experience may be degraded.
          </AlertDescription>
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
          w="md"
          bg="white"
          p="6"
          borderRadius="md"
          boxShadow="md"
          textAlign="center"
        >
          <Box p="2">
            <Heading size="md">Dino</Heading>
          </Box>
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
                  <Heading size="md">0 / {room.people}</Heading>
                </Box>
              </Button>
            ))}
          </VStack>
        </Box>
        <Popup
          open={openPopup}
          type="password"
          title="비밀번호"
          func={checkPassword}
        />
      </Box>
    </>
  )
}
