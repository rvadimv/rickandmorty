import { createBrowserRouter, Navigate } from 'react-router-dom'
import { CharactersPage } from '@/pages/characters-page/CharactersPage'
import { CharacterDetailsPage } from '@/pages/character-details/CharacterDetailsPage'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/characters" replace />,
  },
  {
    path: '/characters',
    element: <CharactersPage />,
  },
  {
    path: '/characters/:id',
    element: <CharacterDetailsPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
