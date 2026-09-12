import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ComponentProps, ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Header } from './Header'

const { handleLogoutMock, setThemeMock, mockWatchlistCount } = vi.hoisted(() => ({
  handleLogoutMock: vi.fn(),
  setThemeMock: vi.fn(),
  mockWatchlistCount: { value: 0 },
}))

vi.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    to,
    activeProps,
    inactiveProps,
    ...props
  }: ComponentProps<'a'> & {
    children: ReactNode
    to: string
    activeProps?: ComponentProps<'a'>
    inactiveProps?: ComponentProps<'a'>
  }) => {
    const isActive = to === '/discovery'
    const routeProps = isActive ? activeProps : inactiveProps

    return (
      <a href={to} {...props} {...routeProps} aria-current={isActive ? 'page' : undefined}>
        {children}
      </a>
    )
  },
}))

vi.mock('@/features/auth/logout', () => ({
  useLogout: () => ({ handleLogout: handleLogoutMock }),
}))

vi.mock('@/features/theme', () => ({
  useTheme: () => ({
    isDarkTheme: true,
    setTheme: setThemeMock,
  }),
}))

vi.mock('@/features/watchlist', () => ({
  useWatchlistCount: () => mockWatchlistCount.value,
}))

describe('Header', () => {
  beforeEach(() => {
    handleLogoutMock.mockReset()
    setThemeMock.mockReset()
    mockWatchlistCount.value = 0
  })

  it('renders the brand and main navigation links', () => {
    render(<Header />)

    expect(screen.getByRole('link', { name: /cinedash home/i })).toHaveAttribute(
      'href',
      '/discovery'
    )
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /discovery/i })).toHaveAttribute(
      'href',
      '/discovery'
    )
    expect(screen.getByRole('link', { name: /watchlist/i })).toHaveAttribute(
      'href',
      '/watchlist'
    )
  })

  it('renders watchlist count badge when count > 0', () => {
    mockWatchlistCount.value = 4
    render(<Header />)

    const badge = screen.getByTestId('watchlist-count-badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveTextContent('4')
  })

  it('marks the current route as active', () => {
    render(<Header />)

    expect(screen.getByRole('link', { name: /discovery/i })).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(screen.getByRole('link', { name: /watchlist/i })).not.toHaveAttribute('aria-current')
  })

  it('changes the theme when the switch is toggled', async () => {
    const user = userEvent.setup()
    render(<Header />)

    await user.click(screen.getAllByRole('switch', { name: /alternar tema/i })[0])

    expect(setThemeMock).toHaveBeenCalledWith('light')
  })

  it('calls the logout feature from the action button', async () => {
    const user = userEvent.setup()
    render(<Header />)

    await user.click(screen.getByRole('button', { name: /sair/i }))

    expect(handleLogoutMock).toHaveBeenCalledTimes(1)
  })
})