'use client';

import React from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button } from '../../../components/ui/button';
import { supabaseBrowser } from '../../../lib/supabase/browser';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export default function AuthComponent() {
  const params = useSearchParams();
  const next = params.get('next') || '';
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
    <div className='flex min-h-screen items-center justify-center'>
      <div>
        <div className='space-y-2 text-center'>
          <Link href='/' className='text-3xl font-bold'>
            Logo
          </Link>
        </div>
        <div className='space-y-4'>
          <Button
            className='flex w-full items-center gap-2'
            onClick={() => handleLoginWithOAuth('google')}
          >
            <FcGoogle className='h-5 w-5' />
            Sign in with Google
          </Button>
          <Button
            className='flex w-full items-center gap-2'
            onClick={() => handleLoginWithOAuth('github')}
          >
            <FaGithub className='h-5 w-5' />
            Sign in with GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
