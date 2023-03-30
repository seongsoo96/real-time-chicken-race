import { Flex, Button, Box, Text } from '@chakra-ui/react'
import { RoomInfo } from 'types'
import { useOpenPwPopupStore, useRoomStore } from '../../store/store'

type Props = {
  room: RoomInfo
  idx: number
}

export default function RoomListItem({ room, idx }: Props) {
  const setRoom = useRoomStore((state) => state.setRoom)
  const setOpenPwPopup = useOpenPwPopupStore((state) => state.setOpenPwPopup)

  const openPwCheckPopup = (room: RoomInfo) => {
    setRoom(room)
    setOpenPwPopup(true)
  }

  return (
    <Flex bgImg="/images/bgRoomList.png" h="72px">
      <Box flex="2.5" w="243px" h="72px" px={2.5} py={4}>
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
      </Box>
      <Flex
        alignItems="center"
        justifyContent="center"
        flex="1"
        bgImg="/images/bgEnterRoom.png"
      >
        <Button
          key={idx}
          w="73px"
          h="42px"
          bgImg="/images/btnToEnter.png"
          _hover={{ bgImg: '/images/btnToEnter.png' }}
          _active={{ bgImg: '/images/btnToEnterPush.png' }}
          onClick={() => openPwCheckPopup(room)}
        ></Button>
      </Flex>
    </Flex>
  )
}
