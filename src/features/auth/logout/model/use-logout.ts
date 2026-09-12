import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/entities/auth/model/store'

export function useLogout() {
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  async function handleLogout() {
    logout()
    await navigate({ to: '/login', replace: true })
  }

  return { handleLogout }
}