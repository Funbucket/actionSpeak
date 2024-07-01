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

  // 데이터베이스에서 id 가져오기
  const { data, error } = await supabase
    .from('website_images')
    .select('id')
    .eq('website_id', websiteId)
    .eq('name', imageName)
    .single();

  if (error) throw new Error(error.message);

  const uniqueName = data.id;

  // Supabase Storage에서 이미지 삭제
  await deleteImage(websiteId, uniqueName);

  // 데이터베이스에서 이미지 레코드 삭제
  const { error: deleteError } = await supabase
    .from('website_images')
    .delete()
    .eq('id', uniqueName);

  if (deleteError) throw new Error(deleteError.message);
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
      if (!name) {
        throw new Error('Image name is required');
      }

      const supabase = supabaseBrowser();
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !sessionData.session?.user) throw new Error('User not found');

      const userId = sessionData.session.user.id;

      // Check if the user is premium
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('is_premium')
        .eq('id', userId)
        .single();

      if (userError) throw new Error(userError.message);

      // Check the number of images already uploaded for the website
      const { data: imageCount, error: countError } = await supabase
        .from('website_images')
        .select('id', { count: 'exact' })
        .eq('website_id', websiteId);

      if (countError) throw new Error(countError.message);

      // Non-premium users can only upload up to 2 images per website
      if (!userData.is_premium && imageCount.length >= 2) {
        throw new Error('Non-premium users can only upload up to 2 images per website');
      }

      // Upload the image and get the public URL
      const { publicUrl, uniqueName } = await uploadImage(file, websiteId);

      // Insert the image record into the database
      const { error: insertError } = await supabase.from('website_images').insert({
        image_url: publicUrl,
        website_id: websiteId,
        name,
        id: uniqueName, // UUID로 변환된 파일명
      });

      if (insertError) throw new Error(insertError.message);

      return publicUrl;
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

  return {
    images: imagesQuery.data || [],
    isLoading: imagesQuery.isLoading,
    addImage: addImageMutation.mutateAsync,
    deleteImage: deleteImageMutation.mutateAsync,
  };
};
