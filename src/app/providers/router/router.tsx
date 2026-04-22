import { createBrowserRouter } from 'react-router-dom'
import { CharactersPage } from '@/pages/characters-page/CharactersPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CharactersPage />,
  },
])
