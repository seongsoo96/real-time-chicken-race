import { Box, Text } from '@chakra-ui/react'
import { RoomInfo } from 'types'

export default function RoomItemInfo({ room }: { room: RoomInfo }) {
  return (
    <>
      <Box w="74px" h="16px" bgColor="#069CD8" mb={1.5} borderRadius="md">
        <Text fontSize="10px" color="#fff">
          공개 : {room.count}/{room.people} 입장
        </Text>
      </Box>
      <Box w="160px" h="18px">
        <Text fontSize="14px" align="left">
          {room.name}
        </Text>
      </Box>
    </>
  )
}
