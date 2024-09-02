import { supabaseBrowser } from './browser';
import { v4 as uuidv4 } from 'uuid';

export const uploadImage = async (file: File, websiteDomain: string) => {
  const supabase = supabaseBrowser();

  const imageId = uuidv4();

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('Images')
    .upload(`${websiteDomain}/${imageId}`, file);

  if (uploadError) throw new Error(uploadError.message);

  const { data: publicData } = supabase.storage.from('Images').getPublicUrl(uploadData.path);

  if (!publicData) throw new Error('Failed to retrieve public URL');

  return { publicUrl: publicData.publicUrl, imageId };
};

export const deleteImage = async (websiteDomain: string, imageId: string) => {
  const supabase = supabaseBrowser();

  const { error: storageError } = await supabase.storage
    .from('Images')
    .remove([`${websiteDomain}/${imageId}`]);

  if (storageError) throw new Error(storageError.message);
};
