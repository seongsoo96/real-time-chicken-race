import {
  Box,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  Image,
  Text,
  Flex,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../store/socket'
import { RoomInfo } from 'types'
import Popup from './trash/Popupssssfsdfasd'
import Wrapper from './waitingRoom/Wrapper'
import Header from './waitingRoom/GameHeader'
import RoomListWrapper from './waitingRoom/RoomListItems'
import Main from './waitingRoom/RoomList'

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
        maxW="375px"
        minH="100vh"
        my="0"
        mx="auto"
        display="flex"
        flexDir="column"
      >
        <Box
          h="387px"
          bg="white"
          px="6"
          pt="14"
          bgImg="/images/bgMainScreen.png"
          bgSize="cover"
        >
          <Image
            borderColor="transparent"
            maxW="328px"
            src="/images/GameTitle.png"
            alt="chiken race"
            mb={4}
          />
          <Button
            bgImg="/images/btnBuildRoom.png"
            onClick={makeNewRoom}
            bgSize="cover"
            w="222px"
            h="81px"
            bgColor="transparent"
            _hover={{ bgImg: '/images/btnBuildRoom.png' }}
            _active={{ bgImg: '/images/btnBuildRoomPush.png' }}
          ></Button>
        </Box>
        <Main roomList={roomList} />
        <Box flex="1" px={3}>
          <Text
            fontFamily="KoreanYNMYTB"
            fontWeight="400"
            fontSize="md"
            textAlign="left"
            color="#fff"
          >
            방 목록(3)
          </Text>
          {roomList.length ? (
            <Box bgColor="#FAF0D1" p={1}>
              <Box bgColor="#EFAF6F" p={1}>
                <Box bgColor="#DF9A59" p={1}>
                  {roomList.map((room, idx) => (
                    <Flex bgImg="/images/bgRoomList.png" h="72px">
                      <Box flex="2.5" w="243px" h="72px" px={2.5} py={4}>
                        <Box
                          w="74px"
                          h="16px"
                          bgColor="#069CD8"
                          mb={1.5}
                          borderRadius="md"
                        >
                          <Text fontSize="10px" color="#fff">
                            공개 : {room.count}/{room.people} 입장
                          </Text>
                        </Box>
                        <Box w="160px" h="18px">
                          <Text fontSize="14px" align="left">
                            {room.name}
                          </Text>
                        </Box>
                      </Box>
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        flex="1"
                        bgImg="/images/bgEnterRoom.png"
                      >
                        <Button
                          key={idx}
                          w="73px"
                          h="42px"
                          bgImg="/images/btnToEnter.png"
                          _hover={{ bgImg: '/images/btnToEnter.png' }}
                          _active={{ bgImg: '/images/btnToEnterPush.png' }}
                          onClick={() => openPwCheckPopup(room)}
                        ></Button>
                      </Flex>
                    </Flex>
                  ))}
                </Box>
              </Box>
            </Box>
          ) : null}
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
