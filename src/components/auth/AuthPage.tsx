'use client';

import React, { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export default function AuthPage() {
  const params = useSearchParams();
  const next = params.get('next') || '';

  useEffect(() => {
    // Remove margin-top for main element on AuthPage
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.classList.add('mt-0');
    }

    return () => {
      // Cleanup: Restore margin-top for main element
      if (mainElement) {
        mainElement.classList.remove('mt-0');
      }
    };
  }, []);

  const handleLoginWithOAuth = (provider: 'github' | 'google') => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: location.origin + '/auth/callback?next=' + next,
      },
    });
  };

  return (
    <section className='mx-auto max-w-2xl px-6'>
      <div className='flex min-h-screen items-center justify-center'>
        <div>
          <Link href='/' className='mb-5 flex shrink-0 items-center justify-center'>
            <Image src='/imgs/logo-image.png' alt='logo-image' width={50} height={25} />
            <Image src='/imgs/logo-text.png' alt='logo-image' width={200} height={100} />
          </Link>

          <div className='mb-8 flex-col items-center justify-center text-center'>
            <span className='text-lg font-semibold text-gray-700 dark:text-gray-400 lg:text-2xl'>
              환영해요. 이제 실시간으로 사용자에게 말을 걸 수 있어요.
            </span>
          </div>

          <div className='space-y-4'>
            <Button
              className='flex w-full items-center gap-2'
              onClick={() => handleLoginWithOAuth('google')}
            >
              <FcGoogle className='h-5 w-5' />
              Google로 시작하기
            </Button>
            <Button
              className='flex w-full items-center gap-2'
              onClick={() => handleLoginWithOAuth('github')}
            >
              <FaGithub className='h-5 w-5' />
              GitHub으로 시작하기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
