import { Text } from '@chakra-ui/react'
import { PlayerInfo } from 'types'

export default function PlayerItemInfo({ info }: { info: PlayerInfo }) {
  return (
    <>
      <Text fontSize="14px" align="left">
        {info.nickName ? info.nickName : '나나나'}
      </Text>
      <Text fontSize="14px" align="left">
        28,000km
      </Text>
    </>
  )
}
