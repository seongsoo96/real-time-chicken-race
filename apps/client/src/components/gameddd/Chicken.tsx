import { Box, keyframes } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useJumpStateStore } from '../../store/store'

export default function Chicken() {
  const jumpKeyframes = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-90px); }
    100% { transform: translateY(0); }
  `
  const jump = `${jumpKeyframes} 0.8s linear 1`
  const { jumpState, setJumpState } = useJumpStateStore()
  const [chickenPos, setChickenPos] = useState({ x: 2, y: 62 })

  return (
    <Box
      as={motion.div}
      animation={jumpState ? jump : ''}
      w="40px"
      h="40px"
      pos="absolute"
      left={chickenPos.x}
      bottom={chickenPos.y}
      zIndex={1}
      bgSize="cover"
      bgImg="/images/game/chicken.gif"
    />
  )
}
