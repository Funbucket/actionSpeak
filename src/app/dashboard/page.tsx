import { Suspense } from 'react';

import DashboardPage from '@/components/dashboard/DashboardPage';

const Dashboard = () => {
  return (
    <Suspense>
      <DashboardPage />
    </Suspense>
  );
};

export default Dashboard;
