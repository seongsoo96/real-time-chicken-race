import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Box,
  Text,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { socket } from '../../store/socket'
import {
  useFormStateStore,
  useOpenNickPopupStore,
  useOpenPwPopupStore,
  useRoomStore,
} from '../../store/store'

interface PopupProps {
  open?: Boolean
  func: (value: string) => void
  type: string
  title: string
}

export default function PasswordPopup() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = useState('')
  const { openPwPopup, setOpenPwPopup } = useOpenPwPopupStore()
  const { formState, setFormState } = useFormStateStore()
  const room = useRoomStore((state) => state.room)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleClick = () => {
    socket.emit('pw_check', { ...room, password: value })
  }

  return (
    <Modal isOpen={openPwPopup} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        w="355px"
        // h="404px"
        p={1}
        bgColor="#FFEFDD"
        borderRadius="none"
        mt="240px"
      >
        <Box
          w="347px"
          // h="396px"
          p={1}
          bgColor="#EFAF6F"
          borderRadius="none"
        >
          <Box
            w="339px"
            // h="388px"
            bgColor="#DF9A59"
            borderRadius="none"
          >
            <ModalCloseButton />
            <ModalBody>
              <Text>비밀번호</Text>
              <Input
                type="text"
                value={value}
                onChange={handleInputChange}
                placeholder={`비밀번호을 입력해주세요.`}
              />
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" onClick={handleClick}>
                확인
              </Button>
            </ModalFooter>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  )
}
