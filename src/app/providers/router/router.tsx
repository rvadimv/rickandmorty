import { createBrowserRouter } from 'react-router-dom'
import { CharactersPage } from '@/pages/characters-page/CharactersPage'
import { CharacterDetailsPage } from '@/pages/character-details/CharacterDetailsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CharactersPage />,
  },
  {
    path: '/characters/:id',
    element: <CharacterDetailsPage />,
  },
])
