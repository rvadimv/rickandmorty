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
    <nav className={s.pagination} aria-label="Characters pagination">
      <button className={s.control} type="button" onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </button>

      <div className={s.pages}>
        {pagesArray.map(page => (
          <button
            key={page}
            className={currentPage === page ? `${s.page} ${s.active}` : s.page}
            type="button"
            aria-current={currentPage === page ? 'page' : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={s.control}
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  )
}
