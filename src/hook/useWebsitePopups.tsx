import { supabaseBrowser } from '@/lib/supabase/browser';
import { PopupData } from '@/lib/types/popup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchWebsitePopup = async (websiteId: string): Promise<PopupData | null> => {
  const supabase = supabaseBrowser();
  const { data, error } = await supabase
    .from('website_popups')
    .select('*')
    .eq('website_id', websiteId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No data found
      return null;
    }
    throw new Error(error.message);
  }

  return data as PopupData;
};

const upsertPopup = async (popupData: PopupData): Promise<PopupData> => {
  const supabase = supabaseBrowser();
  const { data, error } = await supabase
    .from('website_popups')
    .upsert(popupData, { onConflict: 'website_id' })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as PopupData;
};

const deletePopup = async (websiteId: string): Promise<void> => {
  const supabase = supabaseBrowser();
  const { data, error } = await supabase
    .from('website_popups')
    .delete()
    .eq('website_id', websiteId)
    .select();

  if (error) {
    console.error('Error deleting popup:', error);
    throw new Error(error.message);
  }

  if (data && data.length > 1) {
    console.warn(
      `Deleted ${data.length} popups for website ${websiteId}. Expected to delete only one.`
    );
  }
};

export const useWebsitePopups = (websiteId: string) => {
  const queryClient = useQueryClient();

  const popupQuery = useQuery({
    queryKey: ['website_popup', websiteId],
    queryFn: () => fetchWebsitePopup(websiteId),
    enabled: !!websiteId,
  });

  const upsertPopupMutation = useMutation({
    mutationFn: (popupData: PopupData) => upsertPopup({ ...popupData, website_id: websiteId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['website_popup', websiteId] });
    },
  });

  const deletePopupMutation = useMutation({
    mutationFn: () => deletePopup(websiteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['website_popup', websiteId] });
    },
  });

  return {
    popup: popupQuery.data,
    isLoading: popupQuery.isLoading,
    upsertPopup: upsertPopupMutation.mutateAsync,
    deletePopup: deletePopupMutation.mutateAsync,
  };
};
