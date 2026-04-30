export const getCharactersParams = (searchParams: URLSearchParams) => {
  const name = searchParams.get('name') ?? ''
  const status = searchParams.get('status') ?? ''
  const gender = searchParams.get('gender') ?? ''

  const rawPage = searchParams.get('page')
  const parsedPage = Number(rawPage)

  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1

  return { page, name, status, gender }
}
