'use client';

import { useState } from 'react';

import Image from 'next/image';

import CopyButton from '@/components/ui/CopyButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useWebsiteImages } from '@/hook/useWebsiteImages';
import useWebsiteMetrics from '@/hook/useWebsiteMetrics';
import { TrashIcon } from 'lucide-react';

const WebsiteMetrics = ({ params }: { params: { websiteDomain: string } }) => {
  const { data: metrics, isLoading: isLoadingMetrics } = useWebsiteMetrics(params.websiteDomain);
  const {
    images,
    isLoading: isLoadingImages,
    addImage,
    deleteImage,
  } = useWebsiteImages(params.websiteDomain);
  const [file, setFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setError('No file selected');
      return;
    }

    try {
      await addImage({ file, name: imageName });
      setFile(null);
      setImageName('');
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleDelete = async (imageName: string, websiteDomain: string) => {
    try {
      await deleteImage({ imageName, websiteDomain });
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (isLoadingMetrics || !metrics) {
    return <Skeleton className='h-[125px] w-[250px] rounded-xl' />;
  }

  return (
    <>
      <section className='pt-16'>
        <div className='mx-auto max-w-md text-center'>
          <div className='space-y-6'>
            <div className='space-y-2'>
              <h3 className='text-lg'>Make your PoopUp live 🎉</h3>
              <p className='paragraph'>Paste this snippet in the &lt;head&gt; of your website.</p>
            </div>

            <div
              className='flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800'
              data-id='6'
            >
              <pre className='flex-1 overflow-auto font-mono text-sm' data-id='7'>
                {metrics.script}
              </pre>
              <CopyButton variant='secondary' text={metrics.script} />
            </div>
          </div>
        </div>
      </section>
      <section className='mx-auto max-w-2xl px-4 py-8'>
        <h1 className='mb-6 text-2xl font-bold'>Image Gallery</h1>
        <div className='mb-6 rounded-lg bg-card p-6'>
          <form className='grid gap-4' onSubmit={handleUpload}>
            <div className='grid gap-1.5'>
              <Label htmlFor='image'>Upload Image</Label>
              <Input id='image' type='file' onChange={handleFileChange} />
            </div>
            <div className='grid gap-1.5'>
              <Label htmlFor='name'>Image Name</Label>
              <Input
                id='name'
                type='text'
                placeholder='Enter image name'
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
              />
            </div>
            <Button type='submit' className='justify-self-end'>
              Upload
            </Button>
          </form>
          {error && <p className='text-red-500'>{error}</p>}
        </div>
        {isLoadingImages ? (
          <Skeleton className='h-[125px] w-[250px] rounded-xl' />
        ) : (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
            {images.map((image) => (
              <div key={image.id} className='flex flex-col gap-4 rounded-lg bg-card p-4'>
                <Image
                  src={image.image_url}
                  alt={image.description || 'Uploaded image'}
                  width={400}
                  height={300}
                  className='aspect-[4/3] rounded-md object-cover'
                />
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-medium'>{image.name || 'No description'}</p>
                  <Button
                    variant='destructive'
                    size='icon'
                    onClick={() => handleDelete(image.name, params.websiteDomain)}
                  >
                    <TrashIcon className='h-4 w-4' />
                    <span className='sr-only'>Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default WebsiteMetrics;
