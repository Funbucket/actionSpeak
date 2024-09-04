import Link from 'next/link';

import { Button } from '@/components/ui/button';

const HeroSection = () => (
  <section className='mx-auto mt-16 w-full max-w-[950px] px-6 py-12'>
    <div className='container grid px-4 md:px-6 lg:px-8'>
      <div className='flex flex-col items-center justify-center text-center'>
        <h1 className='mb-4 text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl'>
          잠재 고객을 놓치지 않는 방법
        </h1>
        <p className='mb-8 text-base text-gray-800 dark:text-gray-400 lg:text-2xl'>
          방문자의 평균 70%가 구매 없이 이탈합니다.
          <br />
          팝업으로 이탈을 막고 고객을 구매로 유도하세요.
        </p>
        <div className='flex space-x-4'>
          <Button asChild>
            <Link href='/dashboard'>무료로 도입하기</Link>
          </Button>
          <Button variant='outline' asChild>
            <Link href='/contact'>도입 문의하기</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;