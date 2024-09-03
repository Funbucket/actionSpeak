import { Suspense } from 'react';

import DashboardPage from '@/components/dashboardPage';

const Dashboard = () => {
  return (
    <Suspense>
      <DashboardPage />
    </Suspense>
  );
};

export default Dashboard;
