import s from './Pagination.module.scss'
import { getPaginationPages } from '@/shared/lib/getPaginationPages'

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = (props: Props) => {
  const { currentPage, totalPages, onPageChange } = props

  const pagesArray = getPaginationPages(totalPages, currentPage)

  const handlePrev = () => {
    if (currentPage === 1) return

    onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage === totalPages) return

    onPageChange(currentPage + 1)
  }

  return (
    <div className={s.pagination}>
      <button type="button" onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </button>
      <div className={s.pages}>
        {pagesArray.map(p => (
          <button
            type="button"
            key={p}
            className={currentPage === p ? s.active : ''}
            aria-current={currentPage === p ? 'page' : undefined}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <button type="button" onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  )
}
