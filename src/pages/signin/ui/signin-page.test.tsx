import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SigninPage } from './signin-page'

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
}))

describe('SigninPage', () => {
  it('renders the sign-in page and form', () => {
    render(<SigninPage />)

    expect(screen.getByRole('heading', { name: /cinedash/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i, { selector: 'input' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })
})