import React, { useCallback, useEffect, useRef, useState } from 'react'
import Wrapper from '../waitingRoom/Wrapper'
import { Box, Button } from '@chakra-ui/react'
import Floor from './Floor'
import Chicken from './Chicken'
import Fire from './Fire'
import {
  useResultStore,
  useScoreStore,
  useStartStateStore,
} from '../../store/store'
import { socket } from '../../store/socket'
import { Socket } from 'socket.io-client'

export default function Game() {
  const gameRef = useRef<NodeJS.Timeout>()
  const fireRef = useRef<HTMLImageElement>(null)
  const chickenRef = useRef<HTMLImageElement>(null)
  const updateTime = 20
  const { startState, setStartState } = useStartStateStore()
  const [isMove, setIsMove] = useState(false)
  const [time, setTime] = useState(0)
  const { result, setResult } = useResultStore()
  const { score, setScore } = useScoreStore()

  // 충돌 체크하고 충돌이면 게임을 종료
  const checkConflict = () => {
    let fire = fireRef.current
    let chicken = chickenRef.current
    if (fire !== null && chicken !== null) {
      let dis =
        Math.pow(fire.x - chicken.x, 2) + Math.pow(fire.y - chicken.y, 2)
      if (dis < 3000) {
        alert('Game Over!')
        if (result < time) {
          // setResult(time)
        }
        setStartState(false)
        setTime(0)
      }
    }
  }
  // 특정 시간을 주기로
  // 1. Enemy에게 props로 보내는 state를 true 또는 false로 수정
  // 2. 시간을 체크
  // 3. 충돌을 체크
  useEffect(() => {
    if (startState) {
      gameRef.current = setInterval(() => {
        if (Math.floor(time) % 3 == 2) {
          setIsMove(true)
        } else {
          setIsMove(false)
        }
        setTime(time + updateTime * 0.001)
        setScore(Math.floor((time + updateTime * 0.001) * 100))
        checkConflict()
      }, updateTime)
    }
    return () => {
      clearInterval(gameRef.current)
    }
  }, [time, startState])

  useEffect(() => {
    socket.emit('score', socket.id, score)
  }, [score])

  return (
    <Box
      h="210px"
      bg="white"
      bgImg="/images/room/bgSky.png"
      bgSize="cover"
      pos="relative"
    >
      {startState ? (
        <>
          <Floor />
          <Chicken chickenRef={chickenRef} />
          <Fire isMove={isMove} fireRef={fireRef} />
        </>
      ) : (
        <>
          <Box>
            <img
              src="/images/game/chicken.png"
              width="40px"
              style={{ position: 'absolute', bottom: 31, left: '8px' }}
            />
          </Box>
          <Box
            bgImage="/images/game/floor.png"
            w="375px"
            h="62px"
            pos="absolute"
            bottom={-30}
          ></Box>
        </>
      )}
    </Box>
  )
}
