export const getPaginationPages = (totalPages: number | undefined, page: number) => {
  if (!totalPages) return []

  const limit = 10
  const currentBlock = Math.floor((page - 1) / limit)

  const startPage = currentBlock * limit + 1
  const endPage = Math.min(startPage + limit - 1, totalPages)

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
}
