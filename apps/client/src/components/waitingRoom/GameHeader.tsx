import { Box, Image, Button } from '@chakra-ui/react'
import { useOpenMakeRoomPopupStore } from '../../store/store'
import NickNamePopup from './PopupNickName'
import MakeRoomPopup from './PopupMakeRoom'

export default function GameHeader() {
  const { setOpenMakeRoomPopup } = useOpenMakeRoomPopupStore()
  const makeNewRoom = () => {
    setOpenMakeRoomPopup(true)
  }

  return (
    <>
      <Box
        h="387px"
        bg="white"
        px="6"
        pt="14"
        bgImg="/images/waitingRoom/bgMainScreen.png"
        bgSize="cover"
      >
        <Image
          borderColor="transparent"
          maxW="328px"
          src="/images/waitingRoom/GameTitle.png"
          alt="chiken race"
          mb={4}
        />
        <Button
          bgImg="/images/waitingRoom/btnBuildRoom.png"
          onClick={makeNewRoom}
          bgSize="cover"
          w="222px"
          h="81px"
          bgColor="transparent"
          _hover={{ bgImg: '/images/waitingRoom/btnBuildRoom.png' }}
          _active={{ bgImg: '/images/waitingRoom/btnBuildRoomPush.png' }}
        ></Button>
      </Box>
      <MakeRoomPopup />
      <NickNamePopup />
    </>
  )
}
