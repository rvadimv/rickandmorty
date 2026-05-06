import { Outlet } from 'react-router-dom'

import s from './AppLayout.module.scss'

export const AppLayout = () => {
  return (
    <div className={s.wrap}>
      <header className={s.header}>Rick & Morty</header>
      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  )
}
