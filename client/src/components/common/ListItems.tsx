import { Box } from '@chakra-ui/react'
import { PlayerInfo, RoomInfo } from 'types'
import PlayerListItem from '../room/PlayerListItem'

export default function ListItems({
  list,
}: {
  list: PlayerInfo[] | RoomInfo[]
}) {
  return (
    <Box bgColor="#FAF0D1" p={1}>
      <Box bgColor="#EFAF6F" p={1}>
        <Box bgColor="#DF9A59" p={1}>
          {list.map((info, idx) => (
            <PlayerListItem key={idx} info={info} idx={idx} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
