import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  useDisclosure,
} from '@chakra-ui/react'
import React, { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormState } from 'types'
import { socket } from '../../store/socket'
import {
  useFormStateStore,
  useOpenMakeRoomPopupStore,
  useOpenNickPopupStore,
} from '../../store/store'

// const defaultFormState: FormState = {
//   name: '',
//   password: '',
//   people: 0,
// }

export default function MakeRoomPopup() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { openMakeRoomPopup, setOpenMakeRoomPopup } =
    useOpenMakeRoomPopupStore()

  const setOpenNickPopup = useOpenNickPopupStore(
    (state) => state.setOpenNickPopup,
  )

  const navigate = useNavigate()
  const [errorMessage] = useState('')
  const [openPopup, setOpenPopup] = useState(false)
  // const [formState, setFormState] = useState<FormState>(defaultFormState)

  const { formState, setFormState } = useFormStateStore()

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormState({ ...formState, [name]: value })
  }

  const handleClick = () => {
    setOpenNickPopup(true)
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
                <FormControl id="name" isRequired>
                  <FormLabel>방이름</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>비밀번호</FormLabel>
                  <Input
                    type="text"
                    name="password"
                    value={formState.password}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl id="people" isRequired>
                  <FormLabel>인원수</FormLabel>
                  <NumberInput defaultValue={4} max={4} min={1}>
                    <NumberInputField
                      name="people"
                      value={formState.people}
                      onChange={handleInputChange}
                    />
                  </NumberInput>
                </FormControl>
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
