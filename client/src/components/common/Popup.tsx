import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  useDisclosure,
} from '@chakra-ui/react'
import { ReactNode, useEffect, useState } from 'react'

type PopupProps = {
  open: boolean
  close: () => void
  func: () => void
  css: {
    bgc1: string
    bgc2: string
    bgc3: string
    mt: string
    img: string
    imgPush: string
  }
  children: ReactNode
}

export default function Popup(props: PopupProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { open, close, func, children, css } = props

  useEffect(() => {
    open ? onOpen() : onClose()
  }, [open])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent
        w="355px"
        p={1}
        bgColor={css.bgc1}
        borderRadius="none"
        mt={css.mt}
      >
        <Box w="347px" p={1} bgColor={css.bgc2} borderRadius="none">
          <Box w="339px" p={4} bgColor={css.bgc3} borderRadius="none">
            <ModalCloseButton onClick={close} />
            <ModalBody m={0} p={0}>
              {children}
            </ModalBody>
            <ModalFooter p={0} justifyContent="center">
              <Button
                bgImage={css.img}
                w="158px"
                h="80px"
                bgColor="transparent"
                _hover={{ bgImg: `${css.img}` }}
                _active={{ bgImg: `${css.imgPush}` }}
                mt={4}
                colorScheme="blue"
                onClick={func}
              />
            </ModalFooter>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  )
}
