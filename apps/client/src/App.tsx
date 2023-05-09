import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GlobalLayout from './components/GlobalLayout'
import MakeNewRoom from './components/trash/MakeNewRoom'
import Room from './pages/Room'
import WaitingRoom from './pages/WaitingRoom'
import Hello from './components/gameddd/Hello'
import Game from './components/game/Game'

const router = createBrowserRouter([
  {
    path: '/',
    element: <WaitingRoom />,
  },
  {
    path: '/game',
    element: <Game />,
  },
  {
    path: '/hello',
    element: <Hello />,
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
