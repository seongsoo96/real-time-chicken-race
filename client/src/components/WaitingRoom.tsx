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
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoomInfo } from '../../interface'
import { socket } from '../store/socket'
// import { useRoomListStore } from '../store/store'
type roomInfo = {
  name: String
  password: String
  people: number
}

export default function WaitingRoom() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [inputPassword, setInputPassword] = useState('')
  const [roomList, setRoomList] = useState<roomInfo[]>([])
  const navigate = useNavigate()
  const makeNewRoom = () => {
    navigate('/makeNewRoom')
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setInputPassword(event.target.value)
  }
  const checkPassword = () => {}

  const openPwCheckPopup = () => {}

  const enterRoom = (room: roomInfo) => {
    console.log(room)
    socket.emit('enter_room', room)
  }

  useEffect(() => {
    socket.on('room_list', (list) => {
      console.log('waitingRoom room_list.on list ::::')
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
                onClick={() => openPwCheckPopup()}
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
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>비밀번호 입력 ㄱㄱ</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                type="text"
                name="password"
                value={inputPassword}
                onChange={handleInputChange}
                placeholder="비번 입력 ㄱㄱ"
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" onClick={checkPassword}>
                확인
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      {/* <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading size="md">Chakra App</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <Button colorScheme="teal">Sign Up</Button>
          <Button colorScheme="teal">Log in</Button>
        </ButtonGroup>
      </Flex> */}

      {/* <h1>Dino</h1>
      <Button onClick={makeNewRoom} colorScheme="blue">
        방만들기
      </Button>
      <hr />
      <h1>방 목록</h1>
      <ul>
        {roomList?.map((room, idx) => (
          <>
            <li key={idx}>
              <Flex minWidth="max-content" alignItems="center" gap="2">
                <Box p="2">
                  <Heading size="md">{room.name}</Heading>
                </Box>
                <Box p="2">
                  <Heading size="md">0 / {room.people}</Heading>
                </Box>
              </Flex>
            </li>
          </>
        ))}
      </ul> */}
    </>
  )
}
