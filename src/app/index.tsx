import { RouterProvider } from '@tanstack/react-router'
import { QueryClientProvider } from './providers/query-client-provider'
import { router } from './router'

export function App() {
  return (
    <QueryClientProvider>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}