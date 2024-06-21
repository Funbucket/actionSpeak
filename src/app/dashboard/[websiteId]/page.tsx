'use client';

import { useEffect, useState } from 'react';

import CopyButton from '../../../components/ui/CopyButton';
import { Skeleton } from '../../../components/ui/skeleton';
import { supabaseBrowser } from '../../../lib/supabase/browser';

interface WebsiteMetric {
  script: string;
  created_at: string;
  id: string;
  website_id: string;
}

const WebsiteMetrics = ({ params }: { params: { websiteId: string } }) => {
  const [metrics, setMetrics] = useState<WebsiteMetric | null>(null);

  useEffect(() => {
    if (params.websiteId) {
      fetchMetrics(params.websiteId as string);
    }
  }, [params.websiteId]);

  const fetchMetrics = async (websiteId: string) => {
    const supabase = supabaseBrowser();
    const { data, error } = await supabase
      .from('website_metrics')
      .select('*')
      .eq('website_id', websiteId)
      .single();

    if (data) {
      setMetrics(data);
    }
  };

  if (!metrics) return <Skeleton className='h-[125px] w-[250px] rounded-xl' />;

  return (
    <section className='pt-16'>
      <div className='mx-auto max-w-md text-center'>
        <div className='space-y-6'>
          <div className='space-y-2'>
            <h3 className='text-lg'>Make your PoopUp live 🎉</h3>
            <p className='paragraph'>Paste this snippet in the &lt;head&gt; of your website.</p>
          </div>

          <div
            className='flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800'
            data-id='6'
          >
            <pre className='flex-1 overflow-auto font-mono text-sm' data-id='7'>
              {metrics.script}
            </pre>
            <CopyButton variant='secondary' text={metrics.script} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteMetrics;
