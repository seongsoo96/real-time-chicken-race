import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { RoomInfo } from 'types'

type Props = {
  func: () => void
}

export default function EnterButton({ func }: Props) {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flex="1"
      bgImg="/images/waitingRoom/bgEnterRoom.png"
    >
      <Button
        w="73px"
        h="42px"
        bgImg="/images/waitingRoom/btnToEnter.png"
        _hover={{ bgImg: '/images/waitingRoom/btnToEnter.png' }}
        _active={{
          bgImg: '/images/waitingRoom/btnToEnterPush.png',
        }}
        onClick={() => func()}
      ></Button>
    </Flex>
  )
}
