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

const fetchAllWebsites = async () => {
  const supabase = supabaseBrowser();
  const { data, error } = await supabase.from('websites').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const addWebsite = async ({ domain, userId }: { domain: string; userId: string }) => {
  const supabase = supabaseBrowser();

  // 사용자가 프리미엄인지 확인
  const { data: userData, error: userError } = await supabase
    .from('profiles')
    .select('is_premium')
    .eq('id', userId)
    .single();

  if (userError) throw new Error(userError.message);

  // 사용자가 이미 추가한 웹사이트 수를 확인
  const { data: websiteCount, error: countError } = await supabase
    .from('websites')
    .select('id', { count: 'exact' })
    .eq('user_id', userId);

  if (countError) throw new Error(countError.message);

  // 프리미엄이 아닌 사용자는 최대 2개의 웹사이트만 추가 가능
  if (!userData.is_premium && websiteCount.length >= 2) {
    throw new Error('Non-premium users can only add up to 2 websites');
  }

  // 도메인이 이미 존재하는지 확인
  const { data: existingDomain, error: domainError } = await supabase
    .from('websites')
    .select('id')
    .eq('domain', domain)
    .single();

  if (domainError && domainError.code !== 'PGRST116') throw new Error(domainError.message);
  if (existingDomain) throw new Error('Domain already exists');

  const { data, error } = await supabase.from('websites').insert({ domain, user_id: userId });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const deleteWebsite = async ({ websiteId, userId }: { websiteId: string; userId: string }) => {
  const supabase = supabaseBrowser();

  const { error } = await supabase
    .from('websites')
    .delete()
    .eq('id', websiteId)
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }
};

export default function useWebsites() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const queryClient = useQueryClient();

  const websitesQuery = useQuery({
    queryKey: ['websites', user?.id],
    queryFn: () => fetchWebsites(user?.id as string),
    enabled: !!user?.id,
  });

  const allWebsitesQuery = useQuery({
    queryKey: ['allWebsites'],
    queryFn: fetchAllWebsites,
  });

  const addWebsiteMutation = useMutation({
    mutationFn: (domain: string) => addWebsite({ domain, userId: user?.id as string }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websites', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['allWebsites'] });
    },
  });

  const deleteWebsiteMutation = useMutation({
    mutationFn: (websiteId: string) => deleteWebsite({ websiteId, userId: user?.id as string }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websites', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['allWebsites'] });
    },
  });

  return {
    websites: websitesQuery.data || [],
    allWebsites: allWebsitesQuery.data || [],
    isLoading: websitesQuery.isLoading || isUserLoading,
    addWebsite: addWebsiteMutation.mutateAsync,
    deleteWebsite: deleteWebsiteMutation.mutateAsync,
  };
}
