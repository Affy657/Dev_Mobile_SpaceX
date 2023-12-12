import { useState } from 'react'

interface UsePaginationResult<T> {
  data: T
  hasMore: boolean
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  leftCount: number
  totalDataShown: T
  next: () => void
  updateData: (data: T) => void
  page: number
}

export default function usePagination<T extends any[] = any[]> (arr: T, page: number, limit: number): UsePaginationResult<T> {
  const [dataState, setDateState] = useState<T>(arr)
  const [pageState, setPageState] = useState<number>(page)
  const [limitState, setLimitState] = useState<number>(limit)

  const getPaginatedData = (): T => {
    const start = (pageState - 1) * limitState
    const end = start + limitState

    return dataState.slice(start, end) as T
  }

  return {
    data: getPaginatedData(),
    hasMore: dataState.length > pageState * limitState,
    page: pageState,
    setPage: setPageState,
    next: (): void => { setPageState((previousState) => previousState + 1) },
    setLimit: setLimitState,
    leftCount: dataState.length - pageState * limitState,
    totalDataShown: dataState.slice(0, pageState * limitState) as T,
    updateData: () => {
      setDateState(() => arr)
      setPageState(() => 1)
    }
  }
}
