import { Box, Button, keyframes } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useJumpStateStore } from '../../store/store'
import Floor from './Floor'
import ChromeDinoGame from 'react-chrome-dino'

const jumpKeyframes = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-90px); }
  100% { transform: translateY(0); }
`
const jump = `${jumpKeyframes} 0.8s linear 1`

const floorKeyframes = keyframes`
  from { transform: translateX(500px); }
  to { transform: translateX(-500px); }
`
const floorMotion = `${floorKeyframes} 5s linear infinite`

const fireKeyframes = keyframes`
  from { transform: translateX(0px); }
  to { transform: translateX(-500px); }
`
const fireMotion = `${fireKeyframes} 3s linear infinite`

export default function Game() {
  return (
    <Box
      h="210px"
      bg="white"
      bgImg="/images/room/bgSky.png"
      bgSize="cover"
      pos="relative"
      overflow="hidden"
    >
      <ChromeDinoGame />
      {/* <Floor ref={floorFirst} second={floorSecond} /> */}
      {/* <Box
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
      <Box
        as={motion.div}
        pos="absolute"
        bottom={0}
        left="-1000px"
        w="1000px"
        h="62px"
        bgSize="repeat-x"
        bgImg="/images/game/floor.png"
        animation={floorMotion}
      >
        {' '}
        {firePos.map((fire, index) => (
          <Box
            key={index}
            // as={motion.div}
            // animation={fireMotion}
            w="40px"
            h="40px"
            pos="absolute"
            bottom="62"
            zIndex={1}
            bgSize="cover"
            bgImg="/images/game/fire.gif"
            left={fire.x} // Update the left prop to use the fire position
          />
        ))}
      </Box>
      <Box
        as={motion.div}
        pos="absolute"
        bottom={0}
        left={0}
        w="1000px"
        h="62px"
        bgSize="repeat-x"
        bgImg="/images/game/floor.png"
        animation={floorMotion}
      >
        {firePos.map((fire, index) => (
          <Box
            key={index}
            as={motion.div}
            // animation={fireMotion}
            w="40px"
            h="40px"
            pos="absolute"
            bottom="62"
            zIndex={1}
            bgSize="cover"
            bgImg="/images/game/fire.gif"
            left={fire.x} // Update the left prop to use the fire position
          />
        ))}
      </Box>
      <Box
        as={motion.div}
        pos="absolute"
        bottom={0}
        left="1000px"
        w="1000px"
        h="62px"
        bgImg="/images/game/floor.png"
        bgSize="repeat-x"
        animation={floorMotion}
      >
        {firePos.map((fire, index) => (
          <Box
            key={index}
            as={motion.div}
            // animation={fireMotion}
            w="40px"
            h="40px"
            pos="absolute"
            bottom="62"
            zIndex={1}
            bgSize="cover"
            bgImg="/images/game/fire.gif"
            left={fire.x} // Update the left prop to use the fire position
          />
        ))}
      </Box> */}
    </Box>
  )
}
