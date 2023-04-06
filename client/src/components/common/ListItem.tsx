import { Flex, Box, Img } from '@chakra-ui/react'
import { ReactNode } from 'react'
import BgChicken from '../room/BgChicken'

type Props = {
  option?: { color: string; src: string }
  info: ReactNode
  rightBox: ReactNode
}

export default function ListItem(props: Props) {
  const { rightBox, info, option } = props

  return (
    <Flex bgImg="/images/waitingRoom/bgRoomList.png" h="72px">
      {option ? (
        <Box w="72px" px="5px" py="8px" bgImg="/images/room/bgChicken.png">
          <Box h="full" bgColor="#e0cdaf" pos="relative" px="9px" py="6px">
            <BgChicken color={option.color || '#fff'} />
            <Img pos="absolute" src={option.src} opacity="1" />
          </Box>
        </Box>
      ) : null}
      <Box flex="2.5" w="243px" h="72px" px={2.5} py={4}>
        {info}
      </Box>
      {rightBox}
    </Flex>
  )
}
