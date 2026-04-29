export const updateParams = (
  searchParams: URLSearchParams,
  setSearchParams: (params: URLSearchParams) => void,
  updates: Record<string, string | null>,
) => {
  const params = new URLSearchParams(searchParams)

  Object.entries(updates).forEach(([key, value]) => {
    if (value && value.trim() !== '') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
  })

  setSearchParams(params)
}
