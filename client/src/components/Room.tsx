import { Box, Divider, ListItem, UnorderedList, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RoomInfo } from '../../interface'
import { socket } from '../store/socket'
import Popup from './Popup'

interface PlayerInfo {
  id: string
  nickName: string
}
const myInfoDefault: PlayerInfo = { id: '', nickName: '' }
export default function Room() {
  const location = useLocation()
  const navigate = useNavigate()
  const [openPopup, setOpenPopup] = useState(false)
  const [myInfo, setMyInfo] = useState<PlayerInfo>(myInfoDefault)
  const [playerList, setPlayerList] = useState<PlayerInfo[]>([myInfoDefault])
  const [mappedList, setMappedList] = useState<PlayerInfo[]>([])
  const [nickName, setNickName] = useState('')

  const [roomInfo, setRoomInfo] = useState<RoomInfo>({
    name: '',
    password: '',
    people: 0,
  })

  const handleNickNameSetting = (nick: string) => {
    setNickName(nick)
    console.log('룸 대기실 socket.id/nick ::: ', socket.id, nick)
    console.log(roomInfo.name)
    setMyInfo({ id: socket.id, nickName: nick })
    socket.emit('nick_name', {
      id: socket.id,
      nickName: nick,
      roomName: roomInfo.name,
    })
  }

  useEffect(() => {
    setOpenPopup(true)
    socket.on('room_enter', (room) => {
      console.log(`${socket.id}가 방 '${room.name}'에 입장했습니다.`)
      console.log(socket)
      setRoomInfo({ ...room })
    })
    // socket.on('people_list', (list) => {
    //   console.log('people_list ::: ', list)
    //   setPlayerList(list)
    //   console.log(`socket.id ::: `, socket.id)
    //   console.log('playerList ::: ', playerList)
    //   console.log(playerList.filter((player) => player.id !== socket.id))
    // })
    socket.on(
      'player_list',
      (playerList: { id: string; nickName: string }[]) => {
        console.log('playerList ::: ', playerList)

        console.log(playerList.filter((player) => player.id !== socket.id))
        setPlayerList(playerList)
      },
    )
  }, [])

  return (
    <>
      {roomInfo.name}
      {roomInfo.password}
      {roomInfo.people}
      <Box>{socket.id}</Box>
      <UnorderedList>
        <ListItem
          _hover={{ backgroundColor: 'gray.100' }}
          borderBottom="1px"
          borderBottomColor="gray.300"
          p="2"
        >
          <Text fontWeight="bold">내 ID: {myInfo.nickName}</Text>
          <Text color="gray.500" fontSize="sm">
            내 NickName: {myInfo.id}
          </Text>
        </ListItem>
      </UnorderedList>
      <Divider />
      <UnorderedList>
        {playerList
          .filter((player) => player.id !== socket.id)
          .map((player) => (
            <ListItem
              key={player.id}
              _hover={{ backgroundColor: 'gray.100' }}
              borderBottom="1px"
              borderBottomColor="gray.300"
              p="2"
            >
              <Text fontWeight="bold">참가자 닉넴: {player.nickName}</Text>
              <Text color="gray.500" fontSize="sm">
                참가자 id: {player.id}
              </Text>
            </ListItem>
          ))}
      </UnorderedList>
      <p onClick={() => navigate('/')}>홈으로</p>
      <Popup
        type="nickname"
        title="닉네임"
        open={openPopup}
        func={handleNickNameSetting}
      />
    </>
  )
}
