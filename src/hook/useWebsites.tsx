import useUser from './useUser';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchWebsites = async (userId: string) => {
  const supabase = supabaseBrowser();
  const { data, error } = await supabase.from('websites').select('*').eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const addWebsite = async ({ domain, userId }: { domain: string; userId: string }) => {
  const supabase = supabaseBrowser();

  // Check if the user is premium
  const { data: userData, error: userError } = await supabase
    .from('profiles')
    .select('is_premium')
    .eq('id', userId)
    .single();

  if (userError) throw new Error(userError.message);

  // Check the number of websites already added by the user
  const { data: websiteCount, error: countError } = await supabase
    .from('websites')
    .select('id', { count: 'exact' })
    .eq('user_id', userId);

  if (countError) throw new Error(countError.message);

  // Non-premium users can only add up to 2 websites
  if (!userData.is_premium && websiteCount.length >= 2) {
    throw new Error('Non-premium users can only add up to 2 websites');
  }

  const { data, error } = await supabase.from('websites').insert({ domain, user_id: userId });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useWebsites() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const queryClient = useQueryClient();

  const websitesQuery = useQuery({
    queryKey: ['websites', user?.id],
    queryFn: () => fetchWebsites(user?.id as string),
    enabled: !!user?.id,
  });

  const addWebsiteMutation = useMutation({
    mutationFn: (domain: string) => addWebsite({ domain, userId: user?.id as string }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websites', user?.id] });
    },
  });

  return {
    websites: websitesQuery.data || [],
    isLoading: websitesQuery.isLoading || isUserLoading,
    addWebsite: addWebsiteMutation.mutateAsync,
  };
}
