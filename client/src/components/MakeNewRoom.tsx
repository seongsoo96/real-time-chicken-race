import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'
import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { socket } from '../store/socket'
// import { io } from 'socket.io-client'
// const socket = io('localhost:3001/')
import { useSocketStore } from '../store/store'

interface FormState {
  name: string
  password: string
  people: number
}

type roomInfo = {
  name: string
  password: string
  people: number
  id: string
}

export default function MakeNewRoom() {
  // const socket = useSocketStore((state) => state)
  const navigate = useNavigate()
  const [formState, setFormState] = useState<FormState>({
    name: '',
    password: '',
    people: 4,
  })

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormState((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    socket.emit('new_room', formState, (roomInfo: roomInfo) => {
      if (roomInfo) {
        console.log('OK')

        // 대기실에 방 추가하기 로직

        // 방입장
        navigate(`/room/${roomInfo.id}`, { state: roomInfo })
      } else {
        console.log('FAIL')
      }
    })
  }

  return (
    <>
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
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <Button mt={4} colorScheme="blue" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </>
  )
}
