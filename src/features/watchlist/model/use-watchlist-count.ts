import { useWatchlistStore } from '../model/store'
import { selectWatchlistCount } from '../lib/selectors'

export function useWatchlistCount(): number {
  return useWatchlistStore(selectWatchlistCount)
}
