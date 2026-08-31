import { Link } from '@tanstack/react-router';

import { authClient } from '../../auth/client';

export function HomePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <main>
      <h1>Starter Kit</h1>
      <p>A Vite SPA + Better Auth starter template.</p>

      {user ? (
        <p>
          Signed in as <strong>{user.email}</strong>. <Link to="/dashboard">Go to dashboard</Link>
        </p>
      ) : (
        <p>
          <Link to="/login">Sign in</Link> or <Link to="/register">create an account</Link>.
        </p>
      )}
    </main>
  );
}
