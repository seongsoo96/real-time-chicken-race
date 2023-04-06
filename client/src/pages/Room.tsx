import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { socket } from '../store/socket'
import { PlayerInfo, RoomInfo } from 'types'
import Wrapper from '../components/waitingRoom/Wrapper'
import ListItems from '../components/common/ListItems'
import ListItem from '../components/common/ListItem'
import RankCircle from '../components/room/RankCircle'
import PlayerItemInfo from '../components/room/PlayerItemInfo'
import { useNavigate } from 'react-router-dom'

const myInfoDefault: PlayerInfo = { id: '', nickName: '', color: '#FFFFFF' }
export default function Room() {
  const navigate = useNavigate()
  const [myInfo, setMyInfo] = useState<PlayerInfo>(myInfoDefault)
  const [othersInfo, setOthersInfo] = useState<PlayerInfo[]>([])

  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log('handleBeforeUnload가 뭔데ㅔㅔㅔㅔㅔ')
      socket.emit('user_leaving')
    }
    window.addEventListener('beforeunload', handleBeforeUnload)

    socket.listen('room_enter', (room: RoomInfo, list: PlayerInfo[]) => {
      console.log(`${socket.id}가 방 '${room.name}'에 입장했습니다.`)
      console.log(`playerList :::`, list)
      setMyInfo(list.filter((player) => player.id === socket.id)[0])
      setOthersInfo(list.filter((player) => player.id !== socket.id))
    })

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])
  socket.on('disconnect', () => {
    console.log('흠..... 왜 안되지..?')
    navigate('/')
  })

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
          option={{ color: myInfo.color, src: '/images/room/chicken.png' }}
          info={<PlayerItemInfo info={myInfo} />}
          rightBox={<RankCircle imgName="badgeBlue" />}
        />
        {othersInfo.map((player, idx) => (
          <ListItem
            key={idx}
            option={{ color: player.color, src: '/images/room/chicken.png' }}
            info={<PlayerItemInfo info={player} />}
            rightBox={<RankCircle imgName="badgeRed" />}
          />
        ))}
      </ListItems>
    </Wrapper>
  )
}
