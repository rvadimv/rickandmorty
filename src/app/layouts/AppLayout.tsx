import { Link, Outlet } from 'react-router-dom'
import logo from '@/shared/assets/icons/logo.svg'
import s from './AppLayout.module.scss'

export const AppLayout = () => {
  return (
    <div className={s.wrap}>
      <header className={s.header}>
        <Link to={'/'} className={s.logoLink}>
          <img className={s.logo} src={logo} alt="" width={40} height={40} />
          <span>Rick & Morty</span>
        </Link>
      </header>
      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  )
}
