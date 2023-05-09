import { Box, Button, Img, keyframes } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useJumpStateStore, useStartStateStore } from '../../store/store'
import Controller from '../gameddd/Controller'

type Props = {
  chickenRef: React.RefObject<HTMLImageElement>
}

export default function Chicken({ chickenRef }: Props) {
  const { startState } = useStartStateStore()

  const updateTime = 20
  const initTop = 137
  const jumpHeight = 100
  const [top, setTop] = useState(initTop)
  const speed = 5
  const timeOutList: (string | number | NodeJS.Timeout | undefined)[] = []
  const { jumpState, setJumpState } = useJumpStateStore()
  var isJump = false
  const [score, setScore] = useState(0)

  // 컴포넌트가 mount 되는 경우 key event 등록
  // unmount 되는 경우 모든 timeout을 삭제하고 key event를 삭제
  useEffect(() => {
    return () => {
      for (let i = 0; i < timeOutList.length; i++) {
        clearTimeout(timeOutList[i])
      }
    }
  }, [])

  const handleClick = () => {
    console.log('ddd')
    if (!isJump) {
      isJump = !isJump
      jump()
    }
  }

  // 점프
  const jump = () => {
    for (let i = 0; i < (2 * jumpHeight) / speed + 1; i++) {
      let timeOut = setTimeout(() => {
        if (i < jumpHeight / speed) {
          setTop(initTop - speed * i)
        } else {
          setTop(initTop - speed * ((2 * jumpHeight) / speed - i))
        }
        if (i === (2 * jumpHeight) / speed) {
          isJump = false
        }
      }, updateTime * i)
      timeOutList.push(timeOut)
    }
  }

  if (jumpState) {
    if (!isJump) {
      isJump = !isJump
      jump()
    }
  }

  return (
    <>
      <Box>
        <img
          ref={chickenRef}
          src="/images/game/chicken.gif"
          width="40px"
          style={{ position: 'absolute', top: top, left: '8px' }}
        />
      </Box>
      {startState ? (
        <Button
          bgImage="/images/game/btnJump.png"
          w="156px"
          h="73px"
          pos="absolute"
          top="681px"
          right="28px"
          bgColor="transparent"
          bgSize="cover"
          zIndex={2}
          _hover={{ bgImg: `/images/game/btnJump.png` }}
          _active={{ bgImg: `/images/game/btnJumpPush.png` }}
          onClick={handleClick}
        />
      ) : null}
    </>
  )
}
