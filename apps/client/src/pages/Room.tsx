import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { socket } from '../store/socket'
import { PlayerInfo, RoomInfo } from 'types'
import Wrapper from '../components/waitingRoom/Wrapper'
import ListItems from '../components/common/ListItems'
import ListItem from '../components/common/ListItem'
import RankCircle from '../components/room/RankCircle'
import PlayerItemInfo from '../components/room/PlayerItemInfo'
import { useLocation, useNavigate } from 'react-router-dom'
import Game from '../components/game/Game'
import Controller from '../components/gameddd/Controller'

const win: Window = window
const myInfoDefault: PlayerInfo = {
  id: '',
  nickName: '',
  color: '#FFFFFF',
  score: 0,
}
export default function Room() {
  const [myInfo, setMyInfo] = useState<PlayerInfo>(myInfoDefault)
  const [othersInfo, setOthersInfo] = useState<PlayerInfo[]>([])
  const [score, setScore] = useState(0)

  const navigate = useNavigate()
  const location = useLocation()

  const [isNavigatingBack, setIsNavigatingBack] = useState(false)

  useEffect(() => {
    const onBeforeUnload = () => {
      navigate(location.pathname, { replace: true })
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [navigate, location.pathname])

  useEffect(() => {
    if (!socket.id) {
      win.location = '/'
    }

    socket.listen('room_update', (list: PlayerInfo[]) => {
      setOthersInfo(list.filter((player) => player.id !== socket.id))
    })

    const onPopState = () => {
      setIsNavigatingBack(true)
    }
    win.addEventListener('popstate', onPopState)
    return () => {
      win.removeEventListener('popstate', onPopState)
    }
  }, [])

  useEffect(() => {
    if (isNavigatingBack) {
      win.location.reload()
    }
  }, [isNavigatingBack])

  useEffect(() => {
    socket.listen('room_enter', (room: RoomInfo, list: PlayerInfo[]) => {
      console.log(`${socket.id}가 방 '${room.name}'에 입장했습니다.`)
      console.log(`playerList :::`, list)
      setMyInfo(list.filter((player) => player.id === socket.id)[0])
      setOthersInfo(list.filter((player) => player.id !== socket.id))
    })
  }, [myInfo, othersInfo])

  return (
    <Wrapper>
      <Game />
      <Box h="calc(100vh - 313px);" pt="35px">
        <ListItems>
          {myInfo.id ? (
            <ListItem
              option={{ color: myInfo.color, src: '/images/room/chicken.png' }}
              info={<PlayerItemInfo info={myInfo} />}
              rightBox={<RankCircle imgName="badgeBlue" />}
            />
          ) : null}
          {othersInfo.map((player, idx) => (
            <ListItem
              key={idx}
              option={{ color: player.color, src: '/images/room/chicken.png' }}
              info={<PlayerItemInfo info={player} />}
              rightBox={<RankCircle imgName="badgeRed" />}
            />
          ))}
        </ListItems>
      </Box>
      <Controller />
    </Wrapper>
  )
}
