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

interface ImageManagementSectionProps {
  websiteId: string;
}

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

const ImageManagementSection: React.FC<ImageManagementSectionProps> = ({ websiteId }) => {
  const { images, isLoading, addImage, deleteImage } = useWebsiteImages(websiteId);
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [previewType, setPreviewType] = useState<'toast' | 'basicPopup' | 'macWindowPopup'>(
    'toast'
  );

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
    if (file.size > 1 * 1024 * 1024) {
      toast({
        variant: 'destructive',
        title: '업로드 실패',
        description: '파일 크기가 1MB를 초과합니다.',
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
        <h2 className='mb-4 mt-8 text-xl font-bold'>이미지 목록</h2>
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
                      <SelectItem value='toast'>Toast</SelectItem>
                      <SelectItem value='basicPopup'>BasicPopup</SelectItem>
                      <SelectItem value='macWindowPopup'>MacWindowPopup</SelectItem>
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
