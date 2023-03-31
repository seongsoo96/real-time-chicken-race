import { Box } from '@chakra-ui/react'
import { PlayerInfo, RoomInfo } from 'types'
import ListItems from './ListItems'

export default function List({ list }: { list: PlayerInfo[] | RoomInfo[] }) {
  return (
    <Box flex="1" px={3}>
      {list.length ? <ListItems list={list} /> : null}
    </Box>
  )
}
