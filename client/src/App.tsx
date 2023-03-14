import WaitingRoom from './components/WaitingRoom'
import { ServerToClientEvents, ClientToServerEvents } from '../interface'
import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GlobalLayout from './components/GlobalLayout'
import MakeNewRoom from './components/MakeNewRoom'
import Room from './components/Room'
import { socket } from './store/socket'

const router = createBrowserRouter([
  {
    path: '/',
    element: <WaitingRoom />,
  },
  {
    path: '/makeNewRoom',
    element: <MakeNewRoom />,
    errorElement: <WaitingRoom />,
  },
  {
    path: '/room/:id',
    element: <Room />,
    errorElement: <WaitingRoom />,
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
