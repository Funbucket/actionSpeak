'use client';

import { useState } from 'react';

import ImageList from './ImageList';
import ImageUploadForm from './ImageUploadForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { useWebsiteImages } from '@/hook/useWebsiteImages';

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

  const handleUpload = async (file: File, name: string) => {
    try {
      await addImage({ file, name });
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
        <CardTitle className='text-xl font-bold sm:text-2xl'>이미지 관리</CardTitle>
        <CardDescription>팝업에 사용할 이미지를 관리할 수 있어요.</CardDescription>
      </CardHeader>
      <CardContent>
        <ImageUploadForm onUpload={handleUpload} />
        <h2 className='mb-4 mt-8 text-base font-bold sm:text-xl'>이미지 목록</h2>
        {isLoading ? (
          <RenderSkeletonImages count={5} />
        ) : images.length === 0 ? (
          <div className='flex items-center justify-center py-10 text-center'>
            <p className='text-sm text-muted-foreground'>이미지를 추가해서 팝업을 꾸며보세요</p>
          </div>
        ) : (
          <ImageList
            images={images}
            onPreview={handlePreview}
            onDelete={handleDelete}
            previewType={previewType}
            setPreviewType={setPreviewType}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ImageManagementSection;
