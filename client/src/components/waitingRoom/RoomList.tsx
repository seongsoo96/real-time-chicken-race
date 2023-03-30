import { Box } from '@chakra-ui/react'
import { RoomInfo } from 'types'
import RoomListHeader from './RoomListHeader'
import RoomListItems from './RoomListItems'

export default function RoomList({ roomList }: { roomList: RoomInfo[] }) {
  return (
    <Box flex="1" px={3}>
      <RoomListHeader />
      {roomList.length ? <RoomListItems roomList={roomList} /> : null}
    </Box>
  )
}
