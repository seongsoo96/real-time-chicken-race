import { Box, keyframes } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

type Props = {
  first: number
  second: number
}

export default function Floor({ first, second }: Props) {
  // const [floorFirst, setFloorFirst] = useState(0)
  // const [floorSecond, setFloorSecond] = useState(300)
  // const SPEED = 0.05
  // const updateFloor = (delta: number, speedScale: number) => {
  //   // floorFirst+(delta * speedScale * SPEED * -1)
  //   setFloorFirst(floorFirst + delta * speedScale * SPEED * -1)
  //   if (floorFirst <= 300) {
  //     setFloorFirst(600)
  //   }
  //   setFloorSecond(floorSecond + delta * speedScale * SPEED * -1)
  //   if (floorSecond <= 300) {
  //     setFloorSecond(600)
  //   }
  // }

  return (
    <>
      <Box
        pos="absolute"
        width="300%"
        height="62px"
        bottom={0}
        css={{ '--left': `${first}` }}
        bgImg="/images/game/floor.png"
        left={`calc(var(--left) * 1%)`}
      />
      <Box
        pos="absolute"
        width="300%"
        height="62px"
        bottom={0}
        css={{ '--left': `${second}` }}
        bgImg="/images/game/floor.png"
        left={`calc(var(--left) * 1%)`}
      />
    </>
  )
}
