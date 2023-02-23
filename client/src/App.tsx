import WaitingRoom from './components/WaitingRoom'
import { ServerToClientEvents, ClientToServerEvents } from '../interface'
import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GlobalLayout from './components/GlobalLayout'
import MakeNewRoom from './components/MakeNewRoom'
import Room from './components/Room'
import { io, Socket } from 'socket.io-client'
const socket: Socket = io('localhost:3001/')

const router = createBrowserRouter([
  {
    path: '/',
    element: <WaitingRoom />,
  },
  {
    path: '/makeNewRoom',
    element: <MakeNewRoom />,
  },
  {
    path: '/room/:id',
    element: <Room />,
  },
])

function App() {
  return (
    <GlobalLayout>
      <RouterProvider router={router} />
    </GlobalLayout>
  )
}

export default App
