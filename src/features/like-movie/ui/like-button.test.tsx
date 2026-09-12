import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useLikedMoviesStore } from '../model/store'
import { LikeButton } from './like-button'

describe('LikeButton', () => {
  beforeEach(() => {
    useLikedMoviesStore.setState({ likedMovieIds: [] })
  })

  it('renders unpressed state and toggles on click', async () => {
    const user = userEvent.setup()
    render(<LikeButton movieId="test-movie-1" movieTitle="Test Movie" />)

    const button = screen.getByRole('button', { name: /adicionar test movie aos favoritos/i })
    expect(button).toHaveAttribute('aria-pressed', 'false')

    await user.click(button)

    expect(
      screen.getByRole('button', { name: /remover test movie dos favoritos/i })
    ).toHaveAttribute('aria-pressed', 'true')
  })
})
