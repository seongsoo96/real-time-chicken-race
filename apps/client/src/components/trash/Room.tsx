import { Box, Divider, ListItem, UnorderedList, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../store/socket'
import { PlayerInfo, RoomInfo } from 'types'

const roomInfoDefault: RoomInfo = { name: '', people: 0, count: 0 }
const myInfoDefault: PlayerInfo = { id: '', nickName: '' }
export default function Room() {
  const navigate = useNavigate()
  const [myInfo, setMyInfo] = useState<PlayerInfo>(myInfoDefault)
  const [othersInfo, setOthersInfo] = useState<PlayerInfo[]>([])
  const [playerList, setPlayerList] = useState<PlayerInfo[]>([myInfoDefault])
  const [roomInfo, setRoomInfo] = useState<RoomInfo>(roomInfoDefault)

  useEffect(() => {
    socket.listen('room_enter', (room: RoomInfo, list: PlayerInfo[]) => {
      console.log(`${socket.id}가 방 '${room.name}'에 입장했습니다.`)
      console.log(`playerList :::`, list)
      setRoomInfo({ ...room })
      setPlayerList(list)
      setMyInfo(list.filter((player) => player.id === socket.id)[0])
      setOthersInfo(list.filter((player) => player.id !== socket.id))
    })
  }, [])

  return (
    <>
      방 이름 : {roomInfo.name}
      <br />
      현재 인원수 : {playerList.length} /{roomInfo.people}
      <Box>{socket.id}</Box>
      <UnorderedList>
        <ListItem
          _hover={{ backgroundColor: 'gray.100' }}
          borderBottom="1px"
          borderBottomColor="gray.300"
          p="2"
        >
          <Text fontWeight="bold">내 닉넴: {myInfo.nickName}</Text>
          <Text color="gray.500" fontSize="sm">
            내 ID: {myInfo.id}
          </Text>
        </ListItem>
      </UnorderedList>
      <Divider />
      <UnorderedList>
        {othersInfo.map((player) => (
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
    </>
  )
}
