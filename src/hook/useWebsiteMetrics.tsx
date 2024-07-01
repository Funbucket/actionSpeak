import { supabaseBrowser } from '@/lib/supabase/browser';
import { useQuery } from '@tanstack/react-query';

const fetchWebsiteMetrics = async (websiteId: string) => {
  const supabase = supabaseBrowser();
  const { data, error } = await supabase
    .from('website_metrics')
    .select('*')
    .eq('website_id', websiteId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useWebsiteMetrics(websiteId: string) {
  return useQuery({
    queryKey: ['website_metrics', websiteId],
    queryFn: () => fetchWebsiteMetrics(websiteId),
    enabled: !!websiteId,
  });
}
