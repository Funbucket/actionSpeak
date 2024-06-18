import { Suspense } from 'react';
import DashboardComponent from './components/DashboardComponent';

const Dashboard = () => {
  return (
    <Suspense>
      <DashboardComponent />
    </Suspense>
  );
};

export default Dashboard;
