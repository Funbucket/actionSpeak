'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { formatDate } from '@/lib/utils';
import { CalendarIcon, EyeIcon, TrashIcon } from 'lucide-react';

const RenderSkeletonImages = ({ count }: { count: number }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className='grid grid-cols-1 items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[1fr_auto]'
      >
        <div className='flex items-center gap-4'>
          <Skeleton className='h-16 w-16 rounded-md' />
          <div className='grid gap-1'>
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
          </div>
        </div>
        <div className='flex flex-wrap justify-end gap-2'>
          <Skeleton className='h-8 w-24' />
          <Skeleton className='h-8 w-8' />
          <Skeleton className='h-8 w-8' />
        </div>
      </div>
    ))}
  </>
);

const ImageManagementSection: React.FC<{ websiteId: string }> = ({ websiteId }) => {
  const { images, isLoading, addImage, deleteImage } = useWebsiteImages(websiteId);
  const { toast } = useToast();
  const [previewType, setPreviewType] = useState<'toast' | 'basicPopup' | 'macWindowPopup'>(
    'toast'
  );
  const [file, setFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 1024 * 1024) {
        setFileError('1MB 이하의 파일을 업로드해주세요');
        setFile(null);
      } else {
        setFileError(null);
        setFile(selectedFile);
      }
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !imageName.trim() || fileError) {
      toast({
        variant: 'destructive',
        title: '업로드 실패',
        description: fileError || '파일과 이미지 이름을 모두 입력해주세요.',
      });
      return;
    }

    setIsUploading(true);
    try {
      await addImage({ file, name: imageName });
      toast({
        title: '업로드 성공',
        description: '이미지가 성공적으로 추가되었습니다.',
      });
      setFile(null);
      setImageName('');
      setFileError(null);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: '업로드 실패',
        description: error.message,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imageName: string) => {
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

  const handlePreview = async (imageName: string) => {
    await window.actionSpeak.imageFetch();

    if (previewType === 'toast') {
      window.actionSpeak.showToast({
        title: 'Preview Title',
        description: 'Preview Description',
        imageName: imageName,
        link: `https://www.actionspeak.kr/dashboard/${websiteId}`,
        closeButton: true,
        position: 'top',
        options: {
          waitFor: 1,
          toastDuration: 5000,
          frequency: 10000,
        },
      });
    } else if (previewType === 'basicPopup') {
      window.actionSpeak.showBasicPopup({
        title: 'Preview Title',
        description: 'Preview Description',
        imageName: imageName,
        button: {
          label: 'Preview',
          link: `https://www.actionspeak.kr/dashboard/${websiteId}`,
        },
        options: {
          waitFor: 1,
          frequency: 10000,
        },
      });
    } else if (previewType === 'macWindowPopup') {
      window.actionSpeak.showMacWindowPopup({
        title: 'Preview Title',
        imageName: imageName,
        link: `https://www.actionspeak.kr/dashboard/${websiteId}`,
        options: {
          waitFor: 1,
          frequency: 100,
        },
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl font-bold sm:text-2xl'>이미지 관리</CardTitle>
        <CardDescription>팝업에 사용할 이미지를 관리할 수 있어요.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className='grid gap-4' onSubmit={handleUpload}>
          <div className='grid gap-2'>
            <Input id='image' type='file' onChange={handleFileChange} disabled={isUploading} />
            {fileError && <p className='text-sm text-red-500'>{fileError}</p>}
          </div>
          <div className='grid gap-2'>
            <Input
              id='name'
              type='text'
              placeholder='이미지의 고유한 이름을 입력해주세요.'
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              disabled={isUploading}
            />
          </div>
          <Button type='submit' className='justify-self-end' disabled={isUploading || !!fileError}>
            {isUploading ? '추가 중...' : '추가하기'}
          </Button>
        </form>

        <h2 className='mb-4 mt-8 text-base font-bold sm:text-xl'>이미지 목록</h2>
        {isLoading ? (
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
                className='grid grid-cols-1 gap-4 border-b pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[1fr_auto]'
              >
                <div className='flex items-center gap-4'>
                  <Image
                    src={image.image_url}
                    alt='Uploaded image'
                    width={64}
                    height={64}
                    className='h-14 w-14 rounded-md border border-gray-300 object-cover object-center'
                  />
                  <div className='grid gap-1'>
                    <p className='font-medium'>{image.name || 'No description'}</p>
                    <div className='flex items-center gap-1 text-sm'>
                      <CalendarIcon className='h-4 w-4' />
                      <span className='text-muted-foreground'>{formatDate(image.created_at)}</span>
                    </div>
                  </div>
                </div>
                <div className='flex flex-wrap items-center gap-2 sm:justify-end'>
                  <Select
                    value={previewType}
                    onValueChange={(value: 'toast' | 'basicPopup' | 'macWindowPopup') =>
                      setPreviewType(value)
                    }
                  >
                    <SelectTrigger className='w-[100px]'>
                      <SelectValue placeholder='미리보기 타입' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='toast'>푸시 팝업</SelectItem>
                      <SelectItem value='basicPopup'>기본 팝업</SelectItem>
                      <SelectItem value='macWindowPopup'>맥 윈도우 팝업</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant='ghost' size='icon' onClick={() => handlePreview(image.name)}>
                    <EyeIcon className='h-5 w-5' />
                    <span className='sr-only'>Preview</span>
                  </Button>
                  <Button variant='ghost' size='icon' onClick={() => handleDelete(image.name)}>
                    <TrashIcon className='h-5 w-5' />
                    <span className='sr-only'>Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageManagementSection;
