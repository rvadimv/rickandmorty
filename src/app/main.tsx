import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './providers/store/store'
import { router } from './providers/router/router'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import './styles/globals.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
