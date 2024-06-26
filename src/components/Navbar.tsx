'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import useUser from '@/hook/useUser';
import { protectedPaths } from '@/lib/constant';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useQueryClient } from '@tanstack/react-query';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const { isFetching, data } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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

  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    handleSheetClose();
  };

  return (
    <nav className='fixed left-0 right-0 top-0 z-50 h-16 w-full bg-white bg-opacity-75 backdrop-blur-md'>
      <div className='container flex h-14 items-center justify-between'>
        <Link href='/' className='flex shrink-0 items-center'>
          <Image src='/imgs/logo-image.png' alt='logo-image' width={30} height={15} />
          <Image src='/imgs/logo-text.png' alt='logo-image' width={120} height={60} />
        </Link>
        <div className='hidden items-center space-x-2 md:flex'>
          {!data?.id ? (
            <Link href='/auth' className='animate-fade'>
              <Button variant='outline'>로그인</Button>
            </Link>
          ) : (
            <>
              <Button variant='ghost' onClick={handleLogout}>
                로그아웃
              </Button>
              {pathname !== '/contact' && (
                <Button variant='ghost' onClick={() => router.push('/contact')}>
                  도입문의
                </Button>
              )}
              {pathname !== '/dashboard' && (
                <Button variant='ghost' onClick={() => router.push('/dashboard')}>
                  대시보드
                </Button>
              )}
            </>
          )}
        </div>
        <div className='flex items-center space-x-2 md:hidden'>
          {!data?.id ? (
            <Link href='/auth' className='animate-fade'>
              <Button variant='outline'>로그인</Button>
            </Link>
          ) : (
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost'>
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className='grid gap-4 py-4'>
                  <Button
                    variant='ghost'
                    onClick={() => handleNavigation('/contact')}
                    className='w-full'
                  >
                    도입문의
                  </Button>

                  <Button
                    variant='ghost'
                    onClick={() => handleNavigation('/dashboard')}
                    className='w-full'
                  >
                    대시보드
                  </Button>

                  <Button
                    variant='ghost'
                    onClick={() => {
                      handleLogout();
                      handleSheetClose();
                    }}
                    className='w-full'
                  >
                    로그아웃
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </nav>
  );
}
