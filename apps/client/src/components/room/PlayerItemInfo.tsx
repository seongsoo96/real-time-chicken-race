import { Text } from '@chakra-ui/react'
import { PlayerInfo } from 'types'
import { useResultStore, useScoreStore } from '../../store/store'
import { useEffect, useState } from 'react'
import { socket } from '../../store/socket'

export default function PlayerItemInfo({ info }: { info: PlayerInfo }) {
  const { result } = useResultStore()
  const [score, setScore] = useState(0)

  useEffect(() => {
    socket.on('send_score', (list: PlayerInfo[]) => {
      const myInfo = list.find((player) => player.id === info.id)
      if (myInfo) {
        setScore(myInfo.score)
      }
    })
  }, [score])

  return (
    <>
      <Text fontSize="14px" align="left">
        {info.nickName ? info.nickName : '나나나'}
      </Text>
      <Text fontSize="14px" align="left">
        {score}km
      </Text>
    </>
  )
}
