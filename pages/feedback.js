import { useAuth } from '@/lib/auth';
import useSWR from 'swr';

import fetcher from '@/utils/fetcher';

import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import FeedbackTable from '@/components/FeedbackTable';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';

export default function MyFeedback() {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/feedback', user.token]: null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {data.feedback.length
        ? <FeedbackTable allFeedback={data.feedback} />
        : <EmptyState />
      }
    </DashboardShell>
  );
}
