import { Suspense } from 'react';

import WebsiteMetricsPage from '@/components/dashboardPage/websitePage';

const WebsiteMetrics = ({ params }: { params: { websiteId: string } }) => {
  return (
    <Suspense>
      <WebsiteMetricsPage params={params} />
    </Suspense>
  );
};

export default WebsiteMetrics;
