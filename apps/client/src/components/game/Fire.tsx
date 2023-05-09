import { useStyles } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

type Props = {
  isMove: boolean
  fireRef: React.RefObject<HTMLImageElement>
}

export default function Fire({ isMove, fireRef }: Props) {
  // init
  const updateTime = 20
  const initLeft = 375
  const moveWidth = 375
  const speed = 5
  const timeOutList: any = []
  // State
  const [left, setLeft] = useState(initLeft)
  const [isMoving, setIsMoving] = useState(false)
  // props.isMove가 변하면 props.isMove를 isMove에 저장
  useEffect(() => {
    //setIsMove(props.isMove);
    if (isMove) {
      setIsMoving(true)
      setLeft(initLeft)
      move()
    }
  }, [isMove])
  // 컴포넌트가 Unmount되면 timeout을 모두 삭제
  useEffect(() => {
    return () => {
      for (let i = 0; i < timeOutList.length; i++) {
        clearTimeout(timeOutList[i])
      }
    }
  }, [])
  // 움직임을 시작하며 끝까지가면 움직임 끝
  const move = () => {
    for (let i = 0; i < moveWidth / speed; i++) {
      let timeOut = setTimeout(() => {
        setLeft(initLeft - speed * i - 80)
        if (i === moveWidth / speed - 1) {
          // setIsMoving(false)
        }
      }, updateTime * i)
      timeOutList.push(timeOut)
    }
  }
  // 움직이는 경우만 렌더링
  return (
    <div>
      {/* {isMoving ? ( */}
      <img
        ref={fireRef}
        id="enemy"
        width="69px"
        src="/images/game/fire.gif"
        style={{
          left: left,
          position: 'absolute',
          top: '127px',
        }}
      ></img>
      {/* ) : null} */}
    </div>
  )
}
