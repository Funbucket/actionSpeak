import { supabaseBrowser } from '@/lib/supabase/browser';
import { deleteImage, uploadImage } from '@/lib/supabase/storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchWebsiteImages = async (websiteId: string) => {
  const supabase = supabaseBrowser();
  const { data, error } = await supabase
    .from('website_images')
    .select('*')
    .eq('website_id', websiteId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const deleteWebsiteImage = async (imageName: string, websiteId: string) => {
  const supabase = supabaseBrowser();

  const { data, error } = await supabase
    .from('website_images')
    .select('id')
    .eq('website_id', websiteId)
    .eq('name', imageName)
    .single();

  if (error) throw new Error(error.message);

  const imageId = data.id;

  await deleteImage(websiteId, imageId);

  const { error: deleteError } = await supabase.from('website_images').delete().eq('id', imageId);

  if (deleteError) throw new Error(deleteError.message);
};

const addWebsiteImage = async (file: File, name: string, websiteId: string) => {
  if (!name) {
    throw new Error('Image name is required');
  }

  const supabase = supabaseBrowser();
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !sessionData.session?.user) throw new Error('User not found');

  const userId = sessionData.session.user.id;

  const { data: userData, error: userError } = await supabase
    .from('profiles')
    .select('is_premium')
    .eq('id', userId)
    .single();

  if (userError) throw new Error(userError.message);

  const { data: imageCount, error: countError } = await supabase
    .from('website_images')
    .select('id', { count: 'exact' })
    .eq('website_id', websiteId);

  if (countError) throw new Error(countError.message);

  if (!userData.is_premium && imageCount.length >= 2) {
    throw new Error('Non-premium users can only upload up to 2 images per website');
  }

  const { publicUrl, imageId } = await uploadImage(file, websiteId);

  const { error: insertError } = await supabase.from('website_images').insert({
    image_url: publicUrl,
    website_id: websiteId,
    name,
    id: imageId,
  });

  if (insertError) throw new Error(insertError.message);

  return publicUrl;
};

export const useWebsiteImages = (websiteId: string) => {
  const queryClient = useQueryClient();

  const imagesQuery = useQuery({
    queryKey: ['website_images', websiteId],
    queryFn: () => fetchWebsiteImages(websiteId),
    enabled: !!websiteId,
  });

  const addImageMutation = useMutation({
    mutationFn: async ({ file, name }: { file: File; name: string }) => {
      return addWebsiteImage(file, name, websiteId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['website_images', websiteId] });
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: async ({ imageName, websiteId }: { imageName: string; websiteId: string }) => {
      await deleteWebsiteImage(imageName, websiteId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['website_images', websiteId] });
    },
  });

  const getImageByName = (imageName: string) => {
    return imagesQuery.data?.find((image) => image.name === imageName);
  };

  return {
    images: imagesQuery.data || [],
    isLoading: imagesQuery.isLoading,
    addImage: addImageMutation.mutateAsync,
    deleteImage: deleteImageMutation.mutateAsync,
    getImageByName,
  };
};
