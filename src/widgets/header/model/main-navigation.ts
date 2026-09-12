export interface MainNavigationItem {
  label: string
  to: '/discovery' | '/watchlist'
}

export const mainNavigationItems = [
  { label: 'Discovery', to: '/discovery' },
  { label: 'Watchlist', to: '/watchlist' },
] satisfies MainNavigationItem[]