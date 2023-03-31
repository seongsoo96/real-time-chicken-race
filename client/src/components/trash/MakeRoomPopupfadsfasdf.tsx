import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../../store/socket'
import {
  useFormStateStore,
  useOpenMakeRoomPopupStore,
  useOpenNickPopupStore,
} from '../../store/store'

export default function MakeRoomPopup() {
  const { onClose } = useDisclosure()
  const { openMakeRoomPopup } = useOpenMakeRoomPopupStore()

  const setOpenNickPopup = useOpenNickPopupStore(
    (state) => state.setOpenNickPopup,
  )

  const navigate = useNavigate()

  const { formState, setFormState } = useFormStateStore()

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log(event.target.name)
    const { name, value } = event.target
    setFormState({ ...formState, [name]: value })
  }

  const handleClick = () => {
    setOpenNickPopup({ openNickPopup: true, type: 'new' })
  }

  const handleNickNameSetting = (nick: string) => {
    socket.emit('nick_name', {
      id: socket.id,
      nickName: nick,
      ...formState,
    })
  }

  useEffect(() => {
    socket.listen('navigate', (name) => {
      navigate(`/room/${name}`)
    })
  }, [])

  return (
    <>
      <Modal isOpen={openMakeRoomPopup} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          w="355px"
          h="404px"
          p={1}
          bgColor="#E3F1F9"
          borderRadius="none"
          mt="192px"
        >
          <Box w="347px" h="396px" p={1} bgColor="#86BBD7" borderRadius="none">
            <Box w="339px" h="388px" bgColor="#71AAC6" borderRadius="none">
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>방이름</Text>
                <Input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder={`방이름을 입력해주세요.`}
                />

                <Text>비밀번호</Text>
                <Input
                  type="text"
                  name="password"
                  value={formState.password}
                  onChange={handleInputChange}
                  placeholder={`비밀번호를 입력해주세요.`}
                />

                <Text>인원수</Text>
                <Input
                  type="text"
                  name="people"
                  value={formState.people}
                  onChange={handleInputChange}
                  placeholder={`인원수을 입력해주세요.`}
                />
              </ModalBody>
              <ModalFooter>
                <Button mt={4} colorScheme="blue" onClick={handleClick}>
                  확인
                </Button>
              </ModalFooter>
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </>
  )
}
