import { describe, expect, it } from 'vitest'
import { mainNavigationItems } from './main-navigation'

describe('mainNavigationItems', () => {
  it('exposes the header navigation links', () => {
    expect(mainNavigationItems).toEqual([
      { label: 'Discovery', to: '/discovery' },
      { label: 'Watchlist', to: '/watchlist' },
    ])
  })
})