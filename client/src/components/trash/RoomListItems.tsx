import { Box } from '@chakra-ui/react'
import { RoomInfo } from 'types'
import RoomListItem from './RoomListItem'

export default function RoomListItems({ roomList }: { roomList: RoomInfo[] }) {
  return (
    <Box bgColor="#FAF0D1" p={1}>
      <Box bgColor="#EFAF6F" p={1}>
        <Box bgColor="#DF9A59" p={1}>
          {roomList.map((room, idx) => (
            <RoomListItem key={idx} room={room} idx={idx} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
