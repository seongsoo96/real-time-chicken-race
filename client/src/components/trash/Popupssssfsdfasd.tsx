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
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { socket } from '../../store/socket'

interface PopupProps {
  open?: Boolean
  func: (value: string) => void
  type: string
  title: string
}

export default function Popup(props: PopupProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = useState('')

  useEffect(() => {
    props.open ? onOpen() : onClose()
  }, [props.open])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleClick = () => {
    props.func(value)
    setValue('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.title} 입력 ㄱㄱ</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            type="text"
            name={props.type}
            value={value}
            onChange={handleInputChange}
            placeholder={`${props.title} 입력해주세요.`}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            취소
          </Button>
          <Button variant="ghost" onClick={handleClick}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
