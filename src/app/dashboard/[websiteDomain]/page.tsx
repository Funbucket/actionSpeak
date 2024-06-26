import { Suspense } from 'react';

import WebsiteMetricsPage from '@/components/dashboard/WebsiteMetricsPage';

const WebsiteMetrics = ({ params }: { params: { websiteDomain: string } }) => {
  return (
    <Suspense>
      <WebsiteMetricsPage params={params} />
    </Suspense>
  );
};

export default WebsiteMetrics;
