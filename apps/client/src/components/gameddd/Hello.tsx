import { Box, Button, keyframes } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import Wrapper from '../waitingRoom/Wrapper'
import { useJumpStateStore } from '../../store/store'
import Chicken from './Chicken'

const jumpKeyframes = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-90px); }
  100% { transform: translateY(0); }
`
const jump = `${jumpKeyframes} 0.8s linear 1`

// Define a function to calculate the translateY value based on current time and animation duration
const calculateTranslateYValue = (currentTime, duration) => {
  const progress = currentTime / duration // Calculate the progress of the animation
  const translateYValue =
    progress <= 0.5 ? -90 + 180 * progress : 90 - 180 * progress // Calculate the translateY value based on the progress
  return translateYValue
}

const floorKeyframes = keyframes`
  from { transform: translateX(375px); }
  to { transform: translateX(-375px); }
`
const floorMotion = `${floorKeyframes} 5s linear infinite`

const fireKeyframes = keyframes`
  from { transform: translateX(0px); }
  to { transform: translateX(-500px); }
`
const fireMotion = `${fireKeyframes} 3s linear infinite`

export default function Hello() {
  const boxRef = useRef(null)
  const [isAnimating, setIsAnimating] = useState(false) // 애니메이션 상태를 저장하는 상태 변수
  let fireAnimation

  const startAnimation = () => {
    let positionX = 0
    const boxElement = boxRef.current
    const animate = () => {
      // requestAnimationFrame 콜백 함수
      positionX -= 1
      boxElement.style.transform = `translateX(${positionX}px)`
      console.log(position)
      // if (positionX === -375) {
      //   return
      // }
      if (
        positionX <= -345 &&
        positionX >= -375 &&
        position >= -30 &&
        position <= -5
      ) {
        return
      }
      fireAnimation = requestAnimationFrame(animate)
    }
    animate()
  }

  const stopAnimation = () => {
    console.log('dlrj ehlsk?')
    cancelAnimationFrame(fireAnimation) // 이전에 요청한 애니메이션 프레임 중지
  }

  const { setJumpState } = useJumpStateStore()
  const [floor, setFloor] = useState(false)
  const handleClick = () => {
    setFloor((prev) => !prev)
    startAnimation()
  }
  const chickenRef = useRef(null)
  const fireRef = useRef(null)

  const { jumpState } = useJumpStateStore()
  const [chickenPos, setChickenPos] = useState({ x: 2, y: 62 })
  const handleJumpClick = () => {
    console.log(chickenRef)
    console.log(
      window.getComputedStyle(chickenRef.current).getPropertyValue('bottom'),
    ),
      setJumpState(true)
    setTimeout(() => {
      setJumpState(false)
    }, 800)
  }
  const handleUpdate = (latest) => {
    const { x, y } = latest
    setChickenPos({ x, y })
    console.log(x)
    console.log(y)
  }
  let position = 0
  let velocity = 0
  const gravity = 0.5
  const jumpForce = 9
  let hello
  const handleJump = () => {
    if (position === 0) {
      velocity = -jumpForce
    }
    animate()
    setTimeout(() => {
      cancelAnimationFrame(hello)
    }, 800)
  }

  const animate = () => {
    position += velocity
    velocity += gravity

    if (position >= 0) {
      position = 0
      velocity = 0
    }
    // if (
    //   positionX <= -335 &&
    //   positionX >= -415 &&
    //   position >= -40 &&
    //   position <= 0
    // ) {
    //   return
    // }

    if (chickenRef.current) {
      chickenRef.current.style.transform = `translateY(${position}px)`
    }
    // console.log(position)

    hello = requestAnimationFrame(animate)
  }

  return (
    <Wrapper>
      <Box
        h="210px"
        bg="white"
        bgImg="/images/room/bgSky.png"
        bgSize="cover"
        pos="relative"
        overflow="hidden"
      >
        {/* <Chicken /> */}
        <Box
          ref={chickenRef}
          w="40px"
          h="40px"
          pos="absolute"
          bottom="62"
          zIndex={1}
          bgSize="cover"
          bgImg="/images/game/chicken.gif"
        />
        <Box
          as={motion.div}
          pos="absolute"
          bottom={0}
          left="0"
          w="100%"
          h="62px"
          bgImg="/images/game/floor.png"
          bgSize="repeat-x"
          animation={floor ? floorMotion : ''}
        />
        <Box
          as={motion.div}
          pos="absolute"
          bottom={0}
          left="-375"
          w="100%"
          h="62px"
          bgImg="/images/game/floor.png"
          bgSize="repeat-x"
          animation={floor ? floorMotion : ''}
        />
        <Box
          as={motion.div}
          pos="absolute"
          bottom={0}
          left="375"
          w="100%"
          h="62px"
          bgImg="/images/game/floor.png"
          bgSize="repeat-x"
          animation={floor ? floorMotion : ''}
        />
        <Box
          ref={boxRef}
          w="40px"
          h="40px"
          pos="absolute"
          bottom="62"
          zIndex={1}
          bgSize="cover"
          bgImg="/images/game/fire.gif"
          left={375} // Update the left prop to use the fire position
        />
      </Box>

      <Button onClick={handleClick}>{floor ? '끝' : '시작'}</Button>
      <Button onClick={handleJump}>점프</Button>
    </Wrapper>
  )
}
