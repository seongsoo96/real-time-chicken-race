import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { PlayerInfo, RoomInfo } from 'types'
import ListItems from '../common/ListItems'

type Props = {
  list: PlayerInfo[] | RoomInfo[]
  type: 'room' | 'player'
}

export default function List({ list, type }: Props) {
  return (
    <Box flex="1" px={3}>
      {list.length ? <ListItems list={list} type={type} /> : null}
    </Box>
  )
}
