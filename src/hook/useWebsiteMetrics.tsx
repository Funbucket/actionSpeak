import { supabaseBrowser } from '@/lib/supabase/browser';
import { useQuery } from '@tanstack/react-query';

const fetchWebsiteMetrics = async (websiteDomain: string) => {
  const supabase = supabaseBrowser();
  const { data, error } = await supabase
    .from('website_metrics')
    .select('*')
    .eq('website_domain', websiteDomain)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useWebsiteMetrics(websiteDomain: string) {
  return useQuery({
    queryKey: ['website_metrics', websiteDomain],
    queryFn: () => fetchWebsiteMetrics(websiteDomain),
    enabled: !!websiteDomain,
  });
}
