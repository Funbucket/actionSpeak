'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { AlertDialogComponent } from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import useWebsites from '@/hook/useWebsites';
import { CalendarIcon } from 'lucide-react';

export default function DashboardComponent() {
  const [domain, setDomain] = useState('');
  const { websites, isLoading, addWebsite, deleteWebsite } = useWebsites();
  const router = useRouter();

  const handleAddWebsite = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    try {
      await addWebsite(domain);
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

  const handleCardClick = (domain: string) => {
    router.push(`/dashboard/${domain}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA'); // This will format the date as YYYY/MM/DD
  };

  return (
    <section className='flex flex-1 flex-col gap-8 px-20 py-20 md:px-16'>
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
      <div className='mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Card key={index}>
                <CardHeader className='flex flex-row items-center justify-between gap-4'>
                  <Skeleton className='h-8 w-1/2' />
                  <Skeleton className='h-8 w-8' />
                </CardHeader>
                <CardContent className='grid gap-2'>
                  <Skeleton className='h-4 w-1/4' />
                </CardContent>
              </Card>
            ))
          : websites.map((site) => (
              <Card
                key={site.id}
                onClick={() => handleCardClick(site.domain)}
                className='hover:scale-20 transform cursor-pointer transition-transform hover:shadow-md'
              >
                <CardHeader className='flex flex-row items-center justify-between gap-4'>
                  <div className='grid gap-1'>
                    <CardTitle>{site.domain}</CardTitle>
                  </div>
                  <AlertDialogComponent onDelete={() => handleDeleteWebsite(site.id)} />
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
    </section>
  );
}
