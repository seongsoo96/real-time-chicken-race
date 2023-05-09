import { Box, Button, Img, chakra } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import floorImg from '../../../public/images/game/floor.png'

export default function Floor() {
  const updateTime = 20
  const speed = 5
  const interval = useRef<NodeJS.Timeout>()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [offSet, setOffSet] = useState(0)

  useEffect(() => {
    return () => clearInterval(interval?.current)
  }, [])

  useEffect(() => {
    draw()
    setBackgroundMovement()
    return () => clearInterval(interval?.current)
  }, [offSet])

  const setBackgroundMovement = () => {
    if (interval) {
      interval.current = setInterval(() => {
        if (offSet == 375 - speed) {
          setOffSet(0)
        } else {
          setOffSet(offSet + speed)
        }
      }, updateTime)
    }
  }
  const draw = () => {
    const canvas = canvasRef.current
    let ctx = canvas?.getContext('2d')
    let imageObj = new Image()
    imageObj.onload = function () {
      // left
      // ctx?.drawImage(imageObj, 0, 148)
      ctx?.drawImage(
        imageObj,
        offSet, // x 좌표
        0, // y 좌표
        375 - offSet, // width
        62, // height
        0,
        0,
        375 - offSet,
        62,
      )
      ctx?.drawImage(imageObj, 0, 0, offSet, 62, 375 - offSet, 0, offSet, 62)
    }
    imageObj.src = floorImg
  }

  return (
    <Box>
      <chakra.canvas
        ref={canvasRef}
        width="375px"
        height="150px"
        id="background"
        pos="absolute"
        top={177}
      />
    </Box>
  )
}
