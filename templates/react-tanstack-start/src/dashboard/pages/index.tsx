import { useNavigate } from '@tanstack/react-router';

import { authClient } from '../../auth/client';

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <main>
      <h1>Dashboard</h1>
      {user && <p>Signed in as {user.email}</p>}

      <button
        type="button"
        onClick={async () => {
          await authClient.signOut();
          await navigate({ to: '/' });
        }}
      >
        Sign out
      </button>
    </main>
  );
}