'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useWebsiteImages } from '@/hook/useWebsiteImages';
import useWebsiteMetrics from '@/hook/useWebsiteMetrics';
import { formatDate } from '@/lib/utils';
import { CalendarIcon, TrashIcon } from 'lucide-react';

const RenderSkeletonMetrics = () => (
  <section className='mx-auto max-w-2xl px-6 py-8'>
    <Card>
      <CardHeader>
        <Skeleton className='h-8 w-3/4' />
        <Skeleton className='mt-2 h-4 w-1/2' />
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
          <Skeleton className='h-20 w-full' />
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Skeleton className='h-8 w-24' />
      </CardFooter>
    </Card>
  </section>
);

const RenderSkeletonImages = ({ count }: { count: number }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className='grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0'
      >
        <div className='flex items-center gap-4'>
          <Skeleton className='h-16 w-16 rounded-md' />
          <div className='grid gap-1'>
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
          </div>
        </div>
        <Skeleton className='h-8 w-8' />
      </div>
    ))}
  </>
);

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
    return <RenderSkeletonMetrics />;
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <>
      <section className='mx-auto mt-16 max-w-2xl px-6 py-8'>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>actionSpeak 설치하기</CardTitle>
            <CardDescription>
              웹사이트의 <code>&lt;head&gt;</code> 에 아래 코드를 붙여넣으세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className='flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800'
              data-id='6'
            >
              <pre className='flex-1 overflow-auto font-mono text-sm' data-id='7'>
                {metrics.script}
              </pre>
            </div>
          </CardContent>
          <CardFooter className='flex justify-end'>
            <Button onClick={() => handleCopy(metrics.script)}>복사하기</Button>
          </CardFooter>
        </Card>
      </section>
      <section className='mx-auto max-w-2xl px-6 py-8'>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>이미지 추가하기</CardTitle>
            <CardDescription>팝업에 사용할 이미지를 추가할 수 있어요.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className='grid gap-4' onSubmit={handleUpload}>
              <div className='grid gap-2'>
                <Input id='image' type='file' onChange={handleFileChange} />
              </div>
              <div className='grid gap-2'>
                <Input
                  id='name'
                  type='text'
                  placeholder='이미지의 고유한 이름을 입력해주세요.'
                  value={imageName}
                  onChange={(e) => setImageName(e.target.value)}
                />
              </div>
              <Button type='submit' className='justify-self-end'>
                추가하기
              </Button>
            </form>
            {error && <p className='mt-2 text-red-500'>{error}</p>}
            <h2 className='mb-4 mt-8 text-2xl font-bold'>이미지 목록</h2>
            <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {isLoadingImages ? (
                <RenderSkeletonImages count={5} />
              ) : (
                images.map((image) => (
                  <div
                    key={image.id}
                    className='grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0'
                  >
                    <div className='flex items-center gap-4'>
                      <Image
                        src={image.image_url}
                        alt={image.description || 'Uploaded image'}
                        width={64}
                        height={64}
                        className='object-position: center h-14 w-14 rounded-md border border-gray-300 object-cover'
                      />
                      <div className='grid gap-1'>
                        <p className='font-medium'>{image.name || 'No description'}</p>
                        <div className='flex items-center gap-1 text-sm'>
                          <CalendarIcon className='h-4 w-4' />
                          <span className='text-muted-foreground'>
                            {formatDate(image.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handleDelete(image.name, params.websiteDomain)}
                    >
                      <TrashIcon className='h-5 w-5' />
                      <span className='sr-only'>Delete</span>
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default WebsiteMetrics;
