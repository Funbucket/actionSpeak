'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import useUser from '../../../hook/useUser';
import useWebsites from '../../../hook/useWebsites';

export default function DashboardComponent() {
  const [url, setUrl] = useState('');
  const { websites, isLoading, addWebsite } = useWebsites();
  const { data: user } = useUser();
  const router = useRouter();

  const handleAddWebsite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user) {
      if (!user.is_premium && websites.length >= 1) {
        router.push('/contact');
        return;
      }

      try {
        await addWebsite(url);
        setUrl('');
      } catch (error: any) {
        console.error('Error adding website:', error);
      }
    } else {
      console.error('User data is not available.');
    }
  };

  return (
    <div>
      <section className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                Manage Your Websites
              </h2>
              <p className='max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                The Popup Notifications dashboard allows you to easily register your websites and
                access the code snippet to integrate with your website.
              </p>
            </div>
            <div className='w-full max-w-sm space-y-2'>
              <form className='flex space-x-2' onSubmit={handleAddWebsite}>
                <Input
                  type='text'
                  placeholder='Enter your website URL'
                  className='max-w-lg flex-1'
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <Button type='submit' disabled={isLoading}>
                  Register
                </Button>
              </form>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <div className='grid gap-4'>
                  {websites.map((site) => (
                    <div
                      key={site.id}
                      className='flex items-center justify-between rounded-lg bg-gray-950 px-4 py-3'
                    >
                      <div className='text-gray-50'>{site.url}</div>
                      <Link
                        href={`/dashboard/${site.id}`}
                        className='inline-flex h-8 items-center justify-center rounded-md bg-gray-50 px-4 text-sm font-medium text-gray-950 shadow transition-colors hover:bg-gray-50/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50'
                        prefetch={false}
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
