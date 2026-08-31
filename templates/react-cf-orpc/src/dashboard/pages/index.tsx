import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { orpc } from '../../api/client';
import { authClient } from '../../auth/client';

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: user } = useQuery(orpc.user.me.queryOptions());

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
