import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { useJumpStateStore } from '../../store/store'

export default function Controller() {
  const { jumpState, setJumpState } = useJumpStateStore()

  const handleJumpClick = () => {
    setJumpState(true)
    setTimeout(() => {
      setJumpState(false)
    }, 1000)
  }

  const handleBoostClick = () => {
    console.log('boost click')
  }
  return (
    <Box
      flex="auto"
      bottom={0}
      w="full"
      h="103px"
      pt="20px"
      bgSize="cover"
      bgImg="/images/game/controller.png"
    >
      <Button
        bgImage="/images/game/btnBoost.png"
        w="156px"
        h="73px"
        bgColor="transparent"
        bgSize="cover"
        _hover={{ bgImg: `/images/game/btnBoost.png` }}
        _active={{ bgImg: `/images/game/btnBoostPush.png` }}
        mr="7px"
        onClick={handleBoostClick}
      />
      <Button
        bgImage="/images/game/btnJump.png"
        w="156px"
        h="73px"
        bgColor="transparent"
        bgSize="cover"
        _hover={{ bgImg: `/images/game/btnJump.png` }}
        _active={{ bgImg: `/images/game/btnJumpPush.png` }}
        onClick={handleJumpClick}
      />
    </Box>
  )
}
