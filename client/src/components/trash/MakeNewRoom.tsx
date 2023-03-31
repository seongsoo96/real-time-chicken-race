import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react'
import React, { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../../store/socket'
import Popup from './Popupssssfsdfasd'
import { FormState } from 'types'

const defaultFormState: FormState = {
  name: '',
  password: '',
  people: 0,
}

export default function MakeNewRoom() {
  const navigate = useNavigate()
  const [errorMessage] = useState('')
  const [openPopup, setOpenPopup] = useState(false)
  const [formState, setFormState] = useState<FormState>(defaultFormState)

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormState((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setOpenPopup(true)
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
      {errorMessage ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>방 이름 중복임.</AlertTitle>
          <AlertDescription>
            Your Chakra experience may be degraded.
          </AlertDescription>
        </Alert>
      ) : null}
      <h1>Dino</h1>
      <Box>
        <form onSubmit={handleSubmit}>
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
              {/* <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper> */}
            </NumberInput>
          </FormControl>

          <Button mt={4} colorScheme="blue" type="submit">
            Submit
          </Button>
        </form>
      </Box>
      <Popup
        type="nickname"
        title="닉네임"
        open={openPopup}
        func={handleNickNameSetting}
      />
    </>
  )
}
