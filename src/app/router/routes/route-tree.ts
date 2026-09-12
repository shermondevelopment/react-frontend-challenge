import { discoveryRoute } from './discovery-route'
import { loginRoute } from './login-route'
import { movieDetailsRoute } from './movie-details-route'
import { rootRoute } from './root-route'
import { rootRedirectRoute } from './root-redirect-route'
import { watchlistRoute } from './watchlist-route'

export const routeTree = rootRoute.addChildren([
  rootRedirectRoute,
  loginRoute,
  discoveryRoute,
  watchlistRoute,
  movieDetailsRoute,
])