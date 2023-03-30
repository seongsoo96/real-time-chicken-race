import { Box, Image, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOpenMakeRoomPopupStore } from '../../store/store'
import NickNamePopup from '../common/NickNamePopup'
import MakeRoomPopup from './MakeRoomPopup'

export default function GameHeader() {
  const { openMakeRoomPopup, setOpenMakeRoomPopup } =
    useOpenMakeRoomPopupStore()
  const navigate = useNavigate()
  const makeNewRoom = () => {
    // navigate('/makeNewRoom')
    setOpenMakeRoomPopup(true)
  }

  return (
    <>
      <Box
        h="387px"
        bg="white"
        px="6"
        pt="14"
        bgImg="/images/bgMainScreen.png"
        bgSize="cover"
      >
        <Image
          borderColor="transparent"
          maxW="328px"
          src="/images/GameTitle.png"
          alt="chiken race"
          mb={4}
        />
        <Button
          bgImg="/images/btnBuildRoom.png"
          onClick={makeNewRoom}
          bgSize="cover"
          w="222px"
          h="81px"
          bgColor="transparent"
          _hover={{ bgImg: '/images/btnBuildRoom.png' }}
          _active={{ bgImg: '/images/btnBuildRoomPush.png' }}
        ></Button>
      </Box>
      <MakeRoomPopup />
      <NickNamePopup />
    </>
  )
}
