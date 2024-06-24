import { supabaseBrowser } from './browser';
import { v4 as uuidv4 } from 'uuid';

export const uploadImage = async (file: File, websiteDomain: string) => {
  const supabase = supabaseBrowser();

  // 파일명을 UUID로 변환
  const uniqueName = uuidv4();

  // Upload the image to Supabase storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('Images')
    .upload(`${websiteDomain}/${uniqueName}`, file);

  if (uploadError) throw new Error(uploadError.message);

  // Get the public URL of the uploaded image
  const { data: publicData } = supabase.storage.from('Images').getPublicUrl(uploadData.path);

  if (!publicData) throw new Error('Failed to retrieve public URL');

  return { publicUrl: publicData.publicUrl, uniqueName };
};

export const deleteImage = async (websiteDomain: string, uniqueName: string) => {
  const supabase = supabaseBrowser();

  // Delete the image from Supabase storage
  const { error: storageError } = await supabase.storage
    .from('Images')
    .remove([`${websiteDomain}/${uniqueName}`]);

  if (storageError) throw new Error(storageError.message);
};
