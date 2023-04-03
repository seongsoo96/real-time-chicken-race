import { Box, Divider, UnorderedList, Text, Img } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../store/socket'
import { PlayerInfo, RoomInfo } from 'types'
import Wrapper from '../components/waitingRoom/Wrapper'
import List from '../components/trash/List'
import ListItems from '../components/common/ListItems'
import ListItem from '../components/common/ListItem'
import PlayerListItem from '../components/room/PlayerListItem'

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
    <Wrapper>
      <Box
        h="210px"
        bg="white"
        px="6"
        pt="14"
        bgImg="/images/room/bgSky.png"
        bgSize="cover"
      ></Box>
      <ListItems>
        <ListItem
          option={{ color: 'blue', src: '/images/room/chicken.png' }}
          description={
            <>
              <Text fontSize="14px" align="left">
                {myInfo.nickName ? myInfo.nickName : '나나나'}
              </Text>
              <Text fontSize="14px" align="left">
                28,000km
              </Text>
            </>
          }
          rightBox={
            <Box w="72px" p="7px" bgImg="/images/room/bgBadge.png">
              <Img src="/images/room/badgeBlue.png" alt="badge-blue" />
            </Box>
          }
        />
        {othersInfo.map((player, idx) => (
          <ListItem
            key={idx}
            option={{ color: 'blue', src: '/images/room/chicken.png' }}
            description={
              <>
                <Text fontSize="14px" align="left">
                  {player.nickName ? player.nickName : '홍길동'}
                </Text>
                <Text fontSize="14px" align="left">
                  28,000km
                </Text>
              </>
            }
            rightBox={
              <Box w="72px" p="7px" bgImg="/images/room/bgBadge.png">
                <Img src="/images/room/badgeRed.png" alt="badge-red" />
              </Box>
            }
          />
        ))}
      </ListItems>
    </Wrapper>
  )
}
