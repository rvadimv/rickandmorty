export const getCharactersParams = (searchParams: URLSearchParams) => {
  const name = searchParams.get('name') ?? ''
  const status = searchParams.get('status') ?? ''

  const rawPage = searchParams.get('page')
  const parsedPage = Number(rawPage)

  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1

  return { name, status, page }
}
