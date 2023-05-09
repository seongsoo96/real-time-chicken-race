import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { useJumpStateStore, useStartStateStore } from '../../store/store'

export default function Controller() {
  const { jumpState, setJumpState } = useJumpStateStore()
  const { startState, setStartState } = useStartStateStore()

  const handleJumpClick = () => {
    // console.log('ggg')
    setJumpState(true)
    console.log('컨트롤러 점프')
    // setTimeout(() => {
    //   setJumpState(false)
    // }, 800)
  }

  const handleBoostClick = () => {
    console.log('boost click')
  }

  const handleStartClick = () => {
    setStartState(true)
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
      {!startState ? (
        <Button
          bgImage="/images/game/btnJump.png"
          w="156px"
          h="73px"
          bgColor="transparent"
          bgSize="cover"
          _hover={{ bgImg: `/images/game/btnJump.png` }}
          _active={{ bgImg: `/images/game/btnJumpPush.png` }}
          // onClick={handleJumpClick}
        />
      ) : (
        <Button
          bgImage="null"
          w="156px"
          h="73px"
          bgColor="transparent"
          bgSize="cover"
          _hover={{ bgImg: 'none' }}
          _active={{ bgImg: 'none' }}
          cursor="default"
        />
      )}
      {!startState ? (
        <Button
          w="156px"
          h="73px"
          bgSize="cover"
          pos="absolute"
          left="29%"
          onClick={handleStartClick}
        >
          게임시작
        </Button>
      ) : null}
    </Box>
  )
}
