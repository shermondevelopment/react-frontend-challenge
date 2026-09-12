import { Link } from '@tanstack/react-router'
import { Clapperboard, LogOut, Moon, Sun } from 'lucide-react'
import { useLogout } from '@/features/auth/logout'
import { useTheme } from '@/features/theme'
import { useWatchlistCount } from '@/features/watchlist'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Switch } from '@/shared/ui/switch'
import { mainNavigationItems } from '../model/main-navigation'

const navLinkClassName =
  'inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none sm:px-4'

export function Header() {
  const { handleLogout } = useLogout()
  const { isDarkTheme, setTheme } = useTheme()
  const watchlistCount = useWatchlistCount()

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between gap-3 border-b border-white/8 bg-(--primitive-neutral-850) px-3 text-white shadow-[0_1px_0_rgb(255_255_255/0.04)] sm:px-10">
      <Link to="/discovery" className="flex items-center gap-2" aria-label="CineDash home">
        <span className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[0_0_18px_rgb(139_124_255/0.35)]">
          <Clapperboard className="size-4" aria-hidden="true" />
        </span>
        <span className="hidden text-xl font-extrabold tracking-normal min-[420px]:inline">
          Cine<span className="text-primary">Dash</span>
        </span>
      </Link>

      <nav className="flex items-center gap-1 rounded-xl bg-white/5 p-1 sm:gap-2" aria-label="Main navigation">
        {mainNavigationItems.map((item) => {
          const isWatchlist = item.to === '/watchlist'

          return (
            <Link
              key={item.to}
              to={item.to}
              className={navLinkClassName}
              activeProps={{
                className: 'bg-primary text-primary-foreground shadow-[0_8px_18px_rgb(124_58_237/0.28)]',
              }}
              inactiveProps={{
                className: 'text-white/70 hover:bg-white/8 hover:text-white',
              }}
            >
              <span>{item.label}</span>
              {isWatchlist && watchlistCount > 0 && (
                <Badge
                  data-testid="watchlist-count-badge"
                  className="size-5 rounded-full bg-rose-500 p-0 text-[10px] font-bold text-white shadow-xs transition-transform hover:scale-105 border-transparent"
                >
                  {watchlistCount > 99 ? '99+' : watchlistCount}
                </Badge>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-xl border border-white/8 bg-white/5 px-3 py-2 text-white/70 sm:flex">
          <Sun className="size-4" aria-hidden="true" />
          <Switch
            checked={isDarkTheme}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            aria-label="Alternar tema"
          />
          <Moon className="size-4 text-primary" aria-hidden="true" />
        </div>

        <Switch
          checked={isDarkTheme}
          onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          className="sm:hidden"
          aria-label="Alternar tema"
        />

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="size-9 rounded-lg text-error hover:bg-error/10 hover:text-error"
          onClick={handleLogout}
          aria-label="Sair"
        >
          <LogOut className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </header>
  )
}