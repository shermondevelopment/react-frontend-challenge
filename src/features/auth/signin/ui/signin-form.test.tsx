import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAuthStore } from '@/entities/auth/model/store'
import { SigninForm } from './signin-form'

const navigateMock = vi.fn()
const signInRequestMock = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => navigateMock,
}))

vi.mock('@/shared/api/auth', () => ({
  signInRequest: (...args: unknown[]) => signInRequestMock(...args),
}))

describe('SigninForm', () => {
  beforeEach(() => {
    navigateMock.mockReset()
    signInRequestMock.mockReset()
    localStorage.clear()
    useAuthStore.setState({ user: null, isAuthenticated: false })
  })

  it('shows validation errors for invalid credentials', async () => {
    const user = userEvent.setup()
    render(<SigninForm redirectTo="/discovery" />)

    await user.type(screen.getByLabelText(/e-mail/i), 'invalid-email')
    await user.type(screen.getByLabelText(/senha/i, { selector: 'input' }), '123')
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByText('Digite um e-mail válido.')).toBeInTheDocument()
    expect(await screen.findByText('A senha deve possuir pelo menos 6 caracteres.')).toBeInTheDocument()
    expect(signInRequestMock).not.toHaveBeenCalled()
    expect(navigateMock).not.toHaveBeenCalled()
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
  })

  it('authenticates and redirects after a successful login', async () => {
    let resolveSignIn: (value: { id: string; email: string; name: string }) => void
    signInRequestMock.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveSignIn = resolve
      })
    )

    const authenticatedUser = {
      id: 'mock-user-1',
      email: 'ana@example.com',
      name: 'ana',
    }

    const user = userEvent.setup()
    render(<SigninForm redirectTo="/discovery" />)

    await user.type(screen.getByLabelText(/e-mail/i), 'ana@example.com')
    await user.type(screen.getByLabelText(/senha/i, { selector: 'input' }), '123456')
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByRole('button', { name: /entrando/i })).toBeDisabled()

    resolveSignIn!(authenticatedUser)

    await waitFor(() => {
      expect(useAuthStore.getState().isAuthenticated).toBe(true)
    })

    expect(useAuthStore.getState().user).toEqual(authenticatedUser)
    expect(navigateMock).toHaveBeenCalledWith({ to: '/discovery', replace: true })
  })

  it('shows the API error without authenticating or redirecting', async () => {
    signInRequestMock.mockRejectedValueOnce(new Error('Credenciais inválidas'))

    const user = userEvent.setup()
    render(<SigninForm redirectTo="/discovery" />)

    await user.type(screen.getByLabelText(/e-mail/i), 'ana@example.com')
    await user.type(screen.getByLabelText(/senha/i, { selector: 'input' }), '123456')
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByText('Credenciais inválidas')).toBeInTheDocument()
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
    expect(navigateMock).not.toHaveBeenCalled()
  })

  it('toggles the password visibility', async () => {
    const user = userEvent.setup()
    render(<SigninForm redirectTo="/discovery" />)

    const passwordInput = screen.getByLabelText(/senha/i, { selector: 'input' })

    expect(passwordInput).toHaveAttribute('type', 'password')

    await user.click(screen.getByRole('button', { name: /mostrar senha/i }))

    expect(passwordInput).toHaveAttribute('type', 'text')
    expect(screen.getByRole('button', { name: /ocultar senha/i })).toBeInTheDocument()
  })
})