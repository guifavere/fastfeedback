import { useAuth } from '@/lib/auth';

import EmptyState from '@/components/EmptyState';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return 'Loading...';
  }

  return <EmptyState />;
}
