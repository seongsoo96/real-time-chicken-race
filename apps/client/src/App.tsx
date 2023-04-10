import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GlobalLayout from './components/GlobalLayout'
import Game from './components/game/Game'
import MakeNewRoom from './components/trash/MakeNewRoom'
import Room from './pages/Room'
import WaitingRoom from './pages/WaitingRoom'

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
