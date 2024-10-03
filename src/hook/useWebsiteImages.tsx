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

  const { data: existingImages, error: existingImagesError } = await supabase
    .from('website_images')
    .select('name')
    .eq('website_id', websiteId);

  if (existingImagesError) throw new Error(existingImagesError.message);

  if (existingImages.some((img) => img.name === name)) {
    throw new Error('동일한 이름의 이미지가 이미 존재합니다.');
  }

  if (!userData.is_premium && existingImages.length >= 2) {
    throw new Error('무료 회원은 웹사이트당 최대 2개의 이미지만 업로드할 수 있습니다.');
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
