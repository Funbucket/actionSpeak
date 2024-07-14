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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { useWebsiteImages } from '@/hook/useWebsiteImages';
import useWebsiteMetrics from '@/hook/useWebsiteMetrics';
import { formatDate } from '@/lib/utils';
import { CalendarIcon, EyeIcon, TrashIcon } from 'lucide-react';

const RenderSkeletonMetrics = () => (
  <section className='mx-auto mt-16 max-w-2xl px-6 py-8'>
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

const WebsiteMetrics = ({ params }: { params: { websiteId: string } }) => {
  const { data: metrics, isLoading: isLoadingMetrics } = useWebsiteMetrics(params.websiteId);
  const {
    images,
    isLoading: isLoadingImages,
    addImage,
    deleteImage,
  } = useWebsiteImages(params.websiteId);
  const [file, setFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const { toast } = useToast();
  const [previewType, setPreviewType] = useState<'toast' | 'popup'>('toast');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast({
        variant: 'destructive',
        title: '업로드 실패',
        description: '파일이 선택되지 않았습니다.',
      });
      return;
    }

    if (!imageName.trim()) {
      toast({
        variant: 'destructive',
        title: '업로드 실패',
        description: '이미지 이름을 입력해주세요.',
      });
      return;
    }

    const validExtensions = ['image/jpeg', 'image/png', 'image/gif'];
    if (file.size > 500 * 1024) {
      toast({
        variant: 'destructive',
        title: '업로드 실패',
        description: '파일 크기가 500KB를 초과합니다.',
      });
      return;
    } else if (!validExtensions.includes(file.type)) {
      toast({
        variant: 'destructive',
        title: '업로드 실패',
        description: '유효하지 않은 파일 형식입니다. 이미지 파일만 업로드 가능합니다.',
      });
      return;
    }

    try {
      await addImage({ file, name: imageName });
      setFile(null);
      setImageName('');
      toast({
        title: '업로드 성공',
        description: '이미지가 성공적으로 추가되었습니다.',
      });
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: '업로드 실패',
        description: e.message,
      });
    }
  };

  const handleDelete = async (imageName: string, websiteId: string) => {
    try {
      await deleteImage({ imageName, websiteId });
      toast({
        title: '삭제 성공',
        description: '이미지가 성공적으로 삭제되었습니다.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: '삭제 실패',
        description: error.message,
      });
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: '복사 성공 📋',
        description: '코드가 클립보드에 복사되었습니다.',
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast({
        title: '복사 실패',
        description: '코드 복사에 실패했습니다.',
      });
    }
  };

  const handlePreview = async (imageName: string) => {
    await window.actionSpeak.imageFetch();

    const baseMessage = {
      title: 'Preview Title',
      description: 'Preview Description',
      img: imageName,
    };

    if (previewType === 'toast') {
      window.actionSpeak.showToast({
        message: {
          ...baseMessage,
          link: `https://www.actionspeak.kr/dashboard/${params.websiteId}`,
          closeButton: true,
          position: 'top',
        },
        waitFor: 1,
        toastDuration: 5000,
        frequency: 10000,
      });
    } else {
      window.actionSpeak.showPopup({
        message: {
          ...baseMessage,
          button: 'Preview',
          buttonLink: `https://www.actionspeak.kr/dashboard/${params.websiteId}`,
        },
        waitFor: 1,

        frequency: 10000,
      });
    }
  };

  if (isLoadingMetrics || !metrics) {
    return <RenderSkeletonMetrics />;
  }

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
            <h2 className='mb-4 mt-8 text-2xl font-bold'>이미지 목록</h2>
            {isLoadingImages ? (
              <RenderSkeletonImages count={5} />
            ) : images.length === 0 ? (
              <div className='flex items-center justify-center py-10 text-center'>
                <p className='text-sm text-muted-foreground'>이미지를 추가해서 팝업을 꾸며보세요</p>
              </div>
            ) : (
              <div className='grid grid-cols-1 gap-4'>
                {images.map((image) => (
                  <div
                    key={image.id}
                    className='grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0'
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
                    <div className='flex flex-col gap-2'>
                      <Select
                        value={previewType}
                        onValueChange={(value: 'toast' | 'popup') => setPreviewType(value)}
                      >
                        <SelectTrigger className='w-[100px]'>
                          <SelectValue placeholder='미리보기 타입' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='toast'>Toast</SelectItem>
                          <SelectItem value='popup'>Popup</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant='ghost' size='icon' onClick={() => handlePreview(image.name)}>
                      <EyeIcon className='h-5 w-5' />
                      <span className='sr-only'>Preview</span>
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handleDelete(image.name, params.websiteId)}
                    >
                      <TrashIcon className='h-5 w-5' />
                      <span className='sr-only'>Delete</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default WebsiteMetrics;
