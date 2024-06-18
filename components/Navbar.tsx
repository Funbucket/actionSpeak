'use client';

import React from 'react';
import Link from 'next/link';
import useUser from '@/app/hook/useUser';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { protectedPaths } from '@/lib/constant';
import { Button } from './ui/button';

export default function Navbar() {
  const { isFetching, data } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  if (isFetching || pathname === '/auth') {
    return null;
  }

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    queryClient.clear();
    await supabase.auth.signOut();
    router.refresh();
    if (protectedPaths.includes(pathname)) {
      router.replace('/auth?next=' + pathname);
    }
  };

  return (
    <div className="flex justify-between items-center h-2">
      <Link href="/">
        <h1 className="text-xl font-bold">ActionSpeak</h1>
      </Link>
      <div>
        {!data?.id ? (
          <Link href="/auth" className="animate-fade">
            <Button variant="outline">SignIn</Button>
          </Link>
        ) : (
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
            {pathname !== '/contact' && (
              <Button variant="ghost" onClick={() => router.push('/contact')}>
                Contact
              </Button>
            )}
            {pathname !== '/dashboard' && (
              <Button variant="ghost" onClick={() => router.push('/dashboard')}>
                Dashboard
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
