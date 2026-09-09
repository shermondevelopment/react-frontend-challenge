export function LoginPage() {
  return (
    <main>
      <form>
        <div>
          <h1>Login</h1>
          <p>Entre para acessar a Home.</p>
        </div>
        <label>
          E-mail
          <input
            type="email"
            required
          />
        </label>
        <label>
          Senha
          <input
            type="password"
            required
          />
        </label>
        <button type="submit">Entrar</button>
      </form>
    </main>
  )
}