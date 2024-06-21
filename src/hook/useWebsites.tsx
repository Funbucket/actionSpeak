import { supabaseBrowser } from '../lib/supabase/browser';
import useUser from './useUser';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchWebsites = async (userId: string) => {
  const supabase = supabaseBrowser();
  const { data, error } = await supabase.from('websites').select('*').eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const addWebsite = async ({ url, userId }: { url: string; userId: string }) => {
  const supabase = supabaseBrowser();
  const { data, error } = await supabase.from('websites').insert({ url, user_id: userId });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useWebsites() {
  const { data: user } = useUser();
  const queryClient = useQueryClient();

  const websitesQuery = useQuery({
    queryKey: ['websites', user?.id],
    queryFn: () => fetchWebsites(user?.id as string),
    enabled: !!user?.id,
  });

  const addWebsiteMutation = useMutation({
    mutationFn: (url: string) => addWebsite({ url, userId: user?.id as string }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websites', user?.id] });
    },
  });

  return {
    websites: websitesQuery.data || [],
    isLoading: websitesQuery.isLoading,
    addWebsite: addWebsiteMutation.mutateAsync,
  };
}
