import { createFileRoute } from '@tanstack/react-router';

import { LoginPage } from '../login/pages';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});