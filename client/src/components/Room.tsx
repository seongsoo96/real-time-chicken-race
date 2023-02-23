import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '../../interface'
import { socket } from '../store/socket'
import { useSocketStore } from '../store/store'
export default function Room() {
  const location = useLocation()
  const info = location.state
  // const socket = useSocketStore((state) => state)

  useEffect(() => {
    socket.on('room_enter', (room) => {
      console.log(`Enter room ${room}`)
    })
  })

  return (
    <>
      <p>{info.name}</p>
      <p>{info.password}</p>
      <p>{info.people}</p>
      <p>{info.id}</p>
    </>
  )
}
