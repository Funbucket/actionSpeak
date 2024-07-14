'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { AlertDialogComponent } from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import useWebsites from '@/hook/useWebsites';
import { formatDate } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';

const RenderSkeletonCards = ({ count }: { count: number }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <Card key={index}>
        <CardHeader className='flex flex-row items-center justify-between gap-4'>
          <Skeleton className='h-8 w-1/2' />
          <Skeleton className='h-8 w-8' />
        </CardHeader>
        <CardContent className='grid gap-2'>
          <Skeleton className='h-4 w-1/4' />
        </CardContent>
      </Card>
    ))}
  </>
);

export default function DashboardPage() {
  const { toast } = useToast();
  const [domain, setDomain] = useState('');
  const { websites, allWebsites, isLoading, addWebsite, deleteWebsite } = useWebsites();
  const router = useRouter();

  const handleAddWebsite = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!domain.trim()) {
      toast({
        variant: 'destructive',
        title: '도메인 없음 🫥',
        description: '도메인을 입력해주세요.',
      });
      return;
    }

    let cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');

    if (cleanDomain !== domain) {
      toast({
        title: 'URL을 자동 수정 🔧',
        description: 'URL에서 https://, http://, www. 및 마지막 슬래시(/)가 제거되었습니다.',
      });
      setDomain(cleanDomain);
      return;
    }

    // 전체 도메인 중복 확인
    if (allWebsites.some((site) => site.domain === cleanDomain)) {
      toast({
        variant: 'destructive',
        title: '도메인 중복 🚫',
        description: '해당 도메인이 이미 존재합니다.',
      });
      return;
    }

    try {
      await addWebsite(cleanDomain);
      toast({
        title: '성공적인 프로젝트 생성 🚀',
        description: '이제 설치하러 가볼까요',
        action: (
          <ToastAction
            altText='프로젝트 설치 및 설정하기'
            onClick={() => {
              router.push(`/dashboard/${cleanDomain}`);
            }}
          >
            설치하기
          </ToastAction>
        ),
      });
      setDomain('');
    } catch (error: any) {
      console.error('Error adding website:', error);
      if (error.message.includes('Non-premium users can only add up to 2 websites')) {
        router.push('/contact');
      }
    }
  };

  const handleDeleteWebsite = async (websiteId: string) => {
    try {
      await deleteWebsite(websiteId);
    } catch (error: any) {
      console.error('Error deleting website:', error);
    }
  };

  return (
    <section className='flex flex-1 flex-col gap-8 px-20 py-20 md:px-16'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold'>고객과 소통할 웹사이트를 추가하세요</h1>
      </div>
      <div className='mx-auto flex w-full max-w-5xl items-center gap-4'>
        <form className='flex-1' onSubmit={handleAddWebsite}>
          <Input
            placeholder='예) service.com'
            className='bg-background'
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <Button type='submit' className='sr-only'>
            추가하기
          </Button>
        </form>
        <Button onClick={(e) => handleAddWebsite(e as any)} disabled={isLoading}>
          추가하기
        </Button>
      </div>
      <div className='mx-auto w-full max-w-5xl'>
        {isLoading ? (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <RenderSkeletonCards count={6} />
          </div>
        ) : websites.length === 0 ? (
          <div className='flex items-center justify-center py-40 text-center'>
            <p className='text-sm text-muted-foreground'>
              아직 웹사이트를 추가하지 않았네요!
              <br />
              멋진 팝업을 통해 고객의 마음을 사로잡아 보세요 🚀
            </p>
          </div>
        ) : (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {websites.map((site) => (
              <Card
                key={site.id}
                onClick={() => router.push(`/dashboard/${site.id}`)}
                className='hover:scale-20 transform cursor-pointer transition-transform hover:shadow-md'
              >
                <CardHeader className='flex flex-row items-center justify-between gap-4'>
                  <div className='grid gap-1'>
                    <CardTitle>{site.domain}</CardTitle>
                  </div>
                  <AlertDialogComponent
                    onDelete={() => {
                      handleDeleteWebsite(site.id);
                      toast({
                        title: '프로젝트 제거 🗑️',
                      });
                    }}
                  />
                </CardHeader>
                <CardContent className='grid gap-2'>
                  <div className='flex items-center gap-1 text-sm'>
                    <CalendarIcon className='h-4 w-4' />
                    <span className='text-muted-foreground'>{formatDate(site.created_at)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
