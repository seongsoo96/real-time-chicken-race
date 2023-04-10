import { Box, keyframes } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useJumpStateStore } from '../../store/store'

const jumpKeyframes = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-90px); }
  100% { transform: translateY(0); }
`
const jump = `${jumpKeyframes} 1s ease-in-out 1`

export default function Game() {
  const [chickenPos, setChickenPos] = useState({ x: 2, y: 62 })
  const { jumpState, setJumpState } = useJumpStateStore()

  return (
    <Box
      h="210px"
      bg="white"
      bgImg="/images/room/bgSky.png"
      bgSize="cover"
      pos="relative"
    >
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
        bgImg="/images/game/chicken.png"
      />
      <Box
        as={motion.div}
        pos="absolute"
        bottom={0}
        left={0}
        w="full"
        h="62px"
        overflow="hidden"
        bgImg="/images/game/floor.png"
        bgRepeat="no-repeat"
        transition="0.5s infinity"
      />
    </Box>
  )
}
