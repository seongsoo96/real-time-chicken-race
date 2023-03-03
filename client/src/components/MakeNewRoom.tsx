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
import { socket } from '../store/socket'
import { RoomInfo } from '../../interface'
import { useRoomListStore } from '../store/store'

interface FormState {
  name: string
  password: string
  people: number
}

export default function MakeNewRoom() {
  const { roomList, addRoom, removeRoom, updateRoom } = useRoomListStore()
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
    socket.emit('room_new', formState)

    // socket.emit('new_room', formState, (roomInfo: RoomInfo) => {
    //   if (roomInfo) {
    //     console.log('OK')

    //     // 대기실에 방 추가하기 로직
    //     // addRoom(roomInfo)
    //     socket.emit('room_list', roomList)

    //     // 방입장
    //     navigate(`/room/${roomInfo.id}`, { state: roomInfo })
    //   } else {
    //     console.log('FAIL')
    //   }
    // })
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
